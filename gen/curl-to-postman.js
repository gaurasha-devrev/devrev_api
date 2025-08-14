#!/usr/bin/env node

/**
 * Generate Postman collections directly from cURL files
 * Single source of truth: cURL commands → Postman JSON
 */

const fs = require("fs-extra");
const path = require("path");

class CurlToPostmanGenerator {
  constructor() {
    this.collectionsDir = path.join(__dirname, "..", "collections");
    this.outputDir = path.join(__dirname, "..", "dist");
  }

  async generateFromCurls() {
    console.log("🚀 Generating Postman collections from cURL files...\n");

    // Find all cURL files
    const curlFiles = await this.findAllCurlFiles();
    console.log(`Found ${curlFiles.length} cURL files`);

    // Group by collection
    const collections = await this.groupCurlsByCollection(curlFiles);

    // Generate Postman collections
    const postmanCollections =
      await this.generatePostmanCollections(collections);

    // Generate workspace
    const workspace = this.createWorkspace(postmanCollections);

    // Generate mega collection
    const megaCollection = this.createMegaCollection(postmanCollections);

    // Write outputs
    await this.writeOutputs(workspace, megaCollection);

    console.log("\n✅ Generated Postman collections from cURL files!");
    console.log(
      `📁 Generated ${postmanCollections.length} collections from cURL files`,
    );
  }

  async findAllCurlFiles() {
    const curlFiles = [];
    const dirs = await fs.readdir(this.collectionsDir);

    for (const dir of dirs) {
      const dirPath = path.join(this.collectionsDir, dir);
      const stat = await fs.stat(dirPath);

      if (stat.isDirectory() && dir !== "environments") {
        const files = await fs.readdir(dirPath);
        const curlFilesInDir = files
          .filter((file) => file.endsWith(".curl"))
          .map((file) => ({
            collection: dir,
            name: file.replace(".curl", ""),
            path: path.join(dirPath, file),
          }));

        curlFiles.push(...curlFilesInDir);
        console.log(`✓ Found ${curlFilesInDir.length} cURL files in ${dir}/`);
      }
    }

    return curlFiles;
  }

  async groupCurlsByCollection(curlFiles) {
    const collections = {};

    for (const curlFile of curlFiles) {
      if (!collections[curlFile.collection]) {
        collections[curlFile.collection] = {
          name: this.formatCollectionName(curlFile.collection),
          curls: [],
        };
      }

      const curlContent = await fs.readFile(curlFile.path, "utf8");
      const parsedCurl = await this.parseCurlFile(curlContent, curlFile);

      if (parsedCurl) {
        collections[curlFile.collection].curls.push(parsedCurl);
      }
    }

    return collections;
  }

  async parseCurlFile(content, fileInfo) {
    try {
      // Extract curl command (skip comments and shebang)
      const lines = content
        .split("\n")
        .filter(
          (line) =>
            line.trim() && !line.startsWith("#") && !line.startsWith("#!/"),
        );

      if (lines.length === 0) return null;

      // Join all curl command lines
      const curlCommand = lines
        .join(" ")
        .replace(/\\\s*\n/g, " ")
        .trim();

      // Parse curl command
      const parsed = this.parseCurlCommand(curlCommand);

      if (parsed) {
        parsed.name = this.formatRequestName(fileInfo.name);
        parsed.originalFile = fileInfo.path;
        return parsed;
      }
    } catch (error) {
      console.warn(`⚠️ Could not parse ${fileInfo.path}: ${error.message}`);
    }

    return null;
  }

  parseCurlCommand(curlCommand) {
    const result = {
      method: "GET",
      url: "",
      headers: [],
      body: null,
      variables: new Set(),
    };

    // Extract method
    const methodMatch = curlCommand.match(/-X\s+(\w+)/);
    if (methodMatch) {
      result.method = methodMatch[1].toUpperCase();
    }

    // Extract URL
    const urlMatch = curlCommand.match(
      /curl\s+(?:-X\s+\w+\s+)?["']?([^"'\s]+)["']?/,
    );
    if (urlMatch) {
      result.url = urlMatch[1];
    }

    // Extract headers
    const headerMatches = curlCommand.matchAll(/-H\s+["']([^"']+)["']/g);
    for (const match of headerMatches) {
      const headerLine = match[1];
      const colonIndex = headerLine.indexOf(":");
      if (colonIndex > 0) {
        const key = headerLine.substring(0, colonIndex).trim();
        const value = headerLine.substring(colonIndex + 1).trim();
        result.headers.push({ key, value });
      }
    }

    // Extract body data
    const bodyMatch =
      curlCommand.match(/-d\s+['"]({[^}]*})['"]/) ||
      curlCommand.match(/--data\s+['"]({[^}]*})['"]/) ||
      curlCommand.match(/-d\s+'([^']*)'/) ||
      curlCommand.match(/-d\s+"([^"]*)"/) ||
      curlCommand.match(/--data\s+'([^']*)'/) ||
      curlCommand.match(/--data\s+"([^"]*)"/) ||
      curlCommand.match(/-d\s+([^'\s][^\s]*)/);

    if (bodyMatch) {
      let bodyContent = bodyMatch[1];

      // Try to parse as JSON
      try {
        // Handle escaped quotes and newlines
        bodyContent = bodyContent
          .replace(/\\n/g, "\n")
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'");

        if (bodyContent.startsWith("{")) {
          JSON.parse(bodyContent); // Validate JSON
          result.body = {
            mode: "raw",
            raw: bodyContent,
            options: {
              raw: {
                language: "json",
              },
            },
          };
        } else {
          result.body = {
            mode: "raw",
            raw: bodyContent,
          };
        }
      } catch (e) {
        // Not JSON, treat as raw
        result.body = {
          mode: "raw",
          raw: bodyContent,
        };
      }
    }

    // Extract variables used
    const variableMatches = curlCommand.matchAll(/\$\{?(\w+)\}?/g);
    for (const match of variableMatches) {
      result.variables.add(match[1]);
    }

    // Convert Postman-style variables
    const postmanVarMatches = curlCommand.matchAll(/\{\{([^}]+)\}\}/g);
    for (const match of postmanVarMatches) {
      result.variables.add(match[1]);
    }

    result.variables = Array.from(result.variables);

    return result;
  }

  async generatePostmanCollections(collections) {
    const postmanCollections = [];

    for (const [collectionKey, collection] of Object.entries(collections)) {
      const postmanCollection = {
        info: {
          _postman_id: this.generateId(),
          name: collection.name,
          description: `Generated from cURL files in ${collectionKey}/ folder`,
          schema:
            "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        },
        item: [],
        variable: [
          {
            key: "base_url",
            value: "api.devrev.ai",
            type: "string",
          },
        ],
      };

      // Convert cURL requests to Postman requests
      for (const curl of collection.curls) {
        const postmanRequest = this.curlToPostmanRequest(curl);
        if (postmanRequest) {
          postmanCollection.item.push(postmanRequest);
        }
      }

      // Add collection-level scripts
      postmanCollection.event = [
        {
          listen: "prerequest",
          script: {
            type: "text/javascript",
            exec: [`console.log('${collection.name} - Request starting');`],
          },
        },
        {
          listen: "test",
          script: {
            type: "text/javascript",
            exec: [
              "console.log('Response status:', pm.response.code, pm.response.status);",
            ],
          },
        },
      ];

      postmanCollections.push(postmanCollection);
      console.log(
        `✓ Generated ${collection.name} with ${postmanCollection.item.length} requests`,
      );
    }

    return postmanCollections;
  }

  curlToPostmanRequest(curl) {
    const request = {
      name: curl.name,
      request: {
        method: curl.method,
        header: curl.headers.map((header) => ({
          key: header.key,
          value: header.value,
          type: "text",
        })),
        url: this.parseUrl(curl.url),
      },
    };

    // Add body if present
    if (curl.body) {
      request.request.body = curl.body;
    }

    // Add test script for response handling
    if (curl.method === "POST" && curl.url.includes("create")) {
      request.event = [
        {
          listen: "test",
          script: {
            exec: this.generateTestScript(curl),
            type: "text/javascript",
          },
        },
      ];
    }

    // Add description with original file reference
    request.description = `Generated from: ${path.basename(curl.originalFile)}`;

    return request;
  }

  parseUrl(urlString) {
    // Convert environment variables
    const processedUrl = urlString
      .replace(/{{DEVREV_TOKEN}}/g, "{{aat}}")
      .replace(/\$(\w+)/g, "{{$1}}");

    // Parse URL components
    try {
      const url = new URL(
        processedUrl.replace(/\{\{[^}]+\}\}/g, "placeholder"),
      );

      return {
        raw: processedUrl,
        protocol: url.protocol.replace(":", ""),
        host: [
          processedUrl.includes("{{base_url}}") ? "{{base_url}}" : url.hostname,
        ],
        path: url.pathname.split("/").filter((p) => p),
        query: this.parseQueryParams(url.search),
      };
    } catch (e) {
      // Fallback for malformed URLs
      return {
        raw: processedUrl,
        protocol: "https",
        host: ["{{base_url}}"],
        path: [processedUrl.split("/").pop()],
      };
    }
  }

  parseQueryParams(queryString) {
    if (!queryString || queryString === "?") return [];

    return queryString
      .substring(1)
      .split("&")
      .map((param) => {
        const [key, value] = param.split("=");
        return {
          key: decodeURIComponent(key),
          value: decodeURIComponent(value || ""),
        };
      });
  }

  generateTestScript(curl) {
    const script = [
      "if (pm.response.code === 201 || pm.response.code === 200) {",
      "    const response = pm.response.json();",
      "    console.log('✅ Request successful');",
      "    ",
      "    // Auto-capture common IDs for variable chaining",
    ];

    // Add ID capture based on endpoint
    if (curl.url.includes("accounts.create")) {
      script.push(
        "    if (response.account) pm.environment.set('account_id', response.account.id);",
      );
    }
    if (curl.url.includes("works.create")) {
      script.push("    if (response.work) {");
      script.push("        pm.environment.set('work_id', response.work.id);");
      script.push("        pm.environment.set('ticket_id', response.work.id);");
      script.push("    }");
    }
    if (curl.url.includes("users.create")) {
      script.push(
        "    if (response.dev_user) pm.environment.set('dev_user_id', response.dev_user.id);",
      );
      script.push(
        "    if (response.rev_user) pm.environment.set('rev_user_id', response.rev_user.id);",
      );
    }
    if (curl.url.includes("auth-tokens.create")) {
      script.push(
        "    if (response.access_token) pm.environment.set('aat', response.access_token);",
      );
    }

    script.push("} else {");
    script.push("    console.log('❌ Request failed:', pm.response.text());");
    script.push("}");

    return script;
  }

  createWorkspace(collections) {
    return {
      info: {
        _postman_id: this.generateId(),
        name: "DevRev API Workspace (Generated from cURL)",
        description: `Complete DevRev API workspace generated from cURL files.\n\nGenerated on: ${new Date().toISOString()}\n\nThis workspace includes ${collections.length} collections with all endpoints converted from cURL commands.\n\nSource: cURL files in collections/ folders`,
        schema:
          "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      },
      item: collections.map((collection) => ({
        name: collection.info.name,
        item: collection.item || [],
        event: collection.event || [],
        variable: collection.variable || [],
      })),
      variable: [
        {
          key: "base_url",
          value: "api.devrev.ai",
          type: "string",
        },
      ],
    };
  }

  createMegaCollection(collections) {
    return {
      info: {
        _postman_id: this.generateId(),
        name: "DevRev API - Complete Collection (Generated from cURL)",
        description: `Complete DevRev API collection generated from cURL files.\n\nGenerated on: ${new Date().toISOString()}\n\nSource: cURL files in collections/ folders`,
        schema:
          "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      },
      item: collections.map((collection) => ({
        name: collection.info.name.replace("DevRev - ", ""),
        item: collection.item || [],
      })),
      variable: [
        {
          key: "base_url",
          value: "api.devrev.ai",
          type: "string",
        },
      ],
    };
  }

  async writeOutputs(workspace, megaCollection) {
    await fs.ensureDir(this.outputDir);

    // Write workspace
    const workspacePath = path.join(
      this.outputDir,
      "DevRev_Complete_Workspace_FromCurl.postman.json",
    );
    await fs.writeJson(workspacePath, workspace, { spaces: 2 });
    console.log(`✓ Generated workspace: ${workspacePath}`);

    // Write mega collection
    const megaPath = path.join(
      this.outputDir,
      "DevRev_Mega_Collection_FromCurl.postman_collection.json",
    );
    await fs.writeJson(megaPath, megaCollection, { spaces: 2 });
    console.log(`✓ Generated mega collection: ${megaPath}`);

    // Generate summary
    const summary = {
      generated_at: new Date().toISOString(),
      source: "cURL files",
      collections_count: workspace.item.length,
      total_endpoints: this.countEndpoints(workspace),
      files_generated: [
        "DevRev_Complete_Workspace_FromCurl.postman.json",
        "DevRev_Mega_Collection_FromCurl.postman_collection.json",
      ],
    };

    await fs.writeJson(
      path.join(this.outputDir, "curl-generation-summary.json"),
      summary,
      { spaces: 2 },
    );
    console.log(
      `✓ Generated summary with ${summary.total_endpoints} total endpoints`,
    );
  }

  countEndpoints(workspace) {
    let total = 0;

    function countItems(items) {
      for (const item of items) {
        if (item.request) {
          total++;
        } else if (item.item) {
          countItems(item.item);
        }
      }
    }

    for (const collection of workspace.item) {
      if (collection.item) {
        countItems(collection.item);
      }
    }

    return total;
  }

  formatCollectionName(folderName) {
    return `DevRev - ${folderName.charAt(0).toUpperCase() + folderName.slice(1).replace(/-/g, " ")} API`;
  }

  formatRequestName(fileName) {
    return fileName
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
}

// CLI interface
if (require.main === module) {
  const generator = new CurlToPostmanGenerator();

  generator
    .generateFromCurls()
    .then(() => {
      console.log(
        "\n🎉 Successfully generated Postman collections from cURL files!",
      );
      console.log("\n📁 Import these files:");
      console.log(
        "   - dist/DevRev_Complete_Workspace_FromCurl.postman.json (recommended)",
      );
      console.log(
        "   - dist/DevRev_Mega_Collection_FromCurl.postman_collection.json",
      );
    })
    .catch((error) => {
      console.error("❌ Generation failed:", error);
      process.exit(1);
    });
}

module.exports = CurlToPostmanGenerator;
