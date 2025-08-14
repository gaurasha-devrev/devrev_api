#!/usr/bin/env node

/**
 * Script to enhance API collections with detailed parameter specifications
 * This script takes basic API collections and adds proper parameter documentation,
 * constraints, validation rules, and detailed request/response schemas
 */

const fs = require("fs-extra");
const path = require("path");

// DevRev API parameter specifications (manually curated from API docs)
const API_SPECIFICATIONS = {
  "auth-tokens": {
    create: {
      endpoint: "auth-tokens.create",
      method: "POST",
      parameters: {
        act_as: {
          type: "string",
          required: false,
          format: "id",
          description:
            "The unique ID of the Dev user or the service account to impersonate",
        },
        aud: {
          type: "array",
          items: "string",
          required: false,
          description: "The expected audience values with respect to the token",
        },
        client_id: {
          type: "string",
          required: false,
          format: "text",
          description:
            "An identifier that represents the application which is requesting the token",
        },
        expires_in: {
          type: "integer",
          required: false,
          minimum: 0,
          maximum: 4294967295,
          description:
            "The expected validity lifetime of the token in number of days",
        },
        grant_type: {
          type: "enum",
          required: false,
          allowedValues: ["urn:devrev:params:oauth:grant-type:token-issue"],
          description: "Specifies the process of obtaining a token",
        },
        display_name: {
          type: "string",
          required: false,
          format: "text",
          description: "Human-readable name for the token",
        },
        scopes: {
          type: "array",
          items: "string",
          required: false,
          description: "Permission scopes for the token",
        },
      },
    },
    get: {
      endpoint: "auth-tokens.get",
      method: "GET",
      parameters: {
        id: {
          type: "string",
          required: true,
          format: "id",
          description: "The unique identifier of the auth token",
        },
        include_permissions: {
          type: "boolean",
          required: false,
          description:
            "Whether to include detailed permissions in the response",
        },
      },
    },
  },
  accounts: {
    create: {
      endpoint: "accounts.create",
      method: "POST",
      parameters: {
        display_name: {
          type: "string",
          required: true,
          format: "text",
          description: "Name of the account",
        },
        artifacts: {
          type: "array",
          items: "string",
          required: false,
          description: "The IDs of the artifacts to associate with the account",
        },
        custom_fields: {
          type: "object",
          required: false,
          description: "Application-defined custom fields",
        },
        custom_schema_spec: {
          type: "object",
          required: false,
          description: "Custom schemas described using identifiers",
        },
        description: {
          type: "string",
          required: false,
          format: "text",
          description: "Description of the account",
        },
        domains: {
          type: "array",
          items: "string",
          required: false,
          description:
            "List of company's domain names. Example - ['devrev.ai']",
        },
        external_refs: {
          type: "array",
          items: "string",
          required: false,
          description:
            "External refs are unique identifiers from your customer system of records",
        },
        owned_by: {
          type: "array",
          items: "string",
          required: false,
          description: "List of Dev users owning this account",
        },
        tags: {
          type: "array",
          items: "object",
          required: false,
          description: "Tags associated with the account",
        },
        tier: {
          type: "string",
          required: false,
          format: "text",
          description: "The tier of the account",
        },
        websites: {
          type: "array",
          items: "string",
          required: false,
          description: "List of company websites. Example - ['www.devrev.ai']",
        },
      },
    },
  },
  works: {
    create: {
      endpoint: "works.create",
      method: "POST",
      parameters: {
        title: {
          type: "string",
          required: true,
          format: "text",
          description: "Title of the work item",
        },
        body: {
          type: "string",
          required: false,
          format: "text",
          description: "Body/description of the work item",
        },
        type: {
          type: "enum",
          required: true,
          allowedValues: ["issue", "ticket", "feature", "task", "bug"],
          description: "Type of the work item",
        },
        priority: {
          type: "enum",
          required: false,
          allowedValues: ["p0", "p1", "p2", "p3"],
          description: "Priority level of the work item",
        },
        stage: {
          type: "object",
          required: false,
          properties: {
            name: {
              type: "enum",
              allowedValues: [
                "triage",
                "backlog",
                "in_progress",
                "completed",
                "cancelled",
              ],
              description: "Stage name",
            },
          },
          description: "Current stage of the work item",
        },
        applies_to_part: {
          type: "string",
          required: false,
          format: "id",
          description: "ID of the part this work item applies to",
        },
        owned_by: {
          type: "array",
          items: "string",
          required: false,
          description: "List of user IDs who own this work item",
        },
        reported_by: {
          type: "array",
          items: "string",
          required: false,
          description: "List of user IDs who reported this work item",
        },
      },
    },
  },
};

class SpecificationEnhancer {
  constructor() {
    this.collectionsDir = path.join(__dirname, "..", "collections");
  }

  async enhanceAllCollections() {
    console.log(
      "🚀 Enhancing API collections with detailed specifications...\n",
    );

    for (const [apiName, operations] of Object.entries(API_SPECIFICATIONS)) {
      await this.enhanceCollection(apiName, operations);
    }

    console.log("✅ All collections enhanced with detailed specifications!");
  }

  async enhanceCollection(apiName, operations) {
    console.log(`📝 Enhancing ${apiName} collection...`);

    // Find collection file
    const collectionFiles = await this.findCollectionFiles(apiName);

    if (collectionFiles.length === 0) {
      console.log(`⚠️  No collection found for ${apiName}`);
      return;
    }

    for (const filePath of collectionFiles) {
      await this.enhanceCollectionFile(filePath, operations);
      console.log(`✓ Enhanced ${path.basename(filePath)}`);
    }
  }

  async findCollectionFiles(apiName) {
    const files = [];
    const dirs = await fs.readdir(this.collectionsDir);

    for (const dir of dirs) {
      const dirPath = path.join(this.collectionsDir, dir);
      if ((await fs.stat(dirPath)).isDirectory()) {
        const dirFiles = await fs.readdir(dirPath);
        const collectionFile = dirFiles.find(
          (file) =>
            file.endsWith(".postman_collection.json") &&
            (dir.includes(apiName) || file.toLowerCase().includes(apiName)),
        );

        if (collectionFile) {
          files.push(path.join(dirPath, collectionFile));
        }
      }
    }

    return files;
  }

  async enhanceCollectionFile(filePath, operations) {
    const collection = await fs.readJson(filePath);

    // Enhance each item in the collection
    if (collection.item) {
      collection.item = await this.enhanceItems(collection.item, operations);
    }

    // Add enhanced description
    collection.info.description +=
      "\n\n**Enhanced with detailed parameter specifications from DevRev API documentation.**";

    // Save enhanced collection
    const enhancedPath = filePath.replace(
      ".postman_collection.json",
      "_Enhanced.postman_collection.json",
    );
    await fs.writeJson(enhancedPath, collection, { spaces: 2 });
  }

  async enhanceItems(items, operations) {
    const enhanced = [];

    for (const item of items) {
      if (item.item) {
        // Nested items (folders)
        item.item = await this.enhanceItems(item.item, operations);
        enhanced.push(item);
      } else if (item.request) {
        // Single request item
        const enhancedItem = await this.enhanceRequestItem(item, operations);
        enhanced.push(enhancedItem);
      } else {
        enhanced.push(item);
      }
    }

    return enhanced;
  }

  async enhanceRequestItem(item, operations) {
    const enhanced = { ...item };

    // Try to match with specification
    const spec = this.matchSpecification(item, operations);

    if (spec) {
      enhanced.request = await this.enhanceRequest(item.request, spec);
      enhanced.name = `${enhanced.name} (Enhanced)`;

      // Add detailed description
      const paramDocs = this.generateParameterDocumentation(spec.parameters);
      enhanced.description = `${enhanced.description || ""}\n\n${paramDocs}`;
    }

    return enhanced;
  }

  matchSpecification(item, operations) {
    const method = item.request?.method?.toLowerCase();
    const url = item.request?.url?.raw || "";

    for (const [opName, spec] of Object.entries(operations)) {
      if (spec.method.toLowerCase() === method && url.includes(spec.endpoint)) {
        return spec;
      }
    }

    return null;
  }

  async enhanceRequest(request, spec) {
    const enhanced = { ...request };

    // Enhance request body with proper schema
    if (enhanced.body && spec.parameters) {
      enhanced.body = this.enhanceRequestBody(enhanced.body, spec.parameters);
    }

    // Enhance query parameters
    if (enhanced.url && enhanced.url.query && spec.parameters) {
      enhanced.url.query = this.enhanceQueryParameters(
        enhanced.url.query,
        spec.parameters,
      );
    }

    return enhanced;
  }

  enhanceRequestBody(body, parameters) {
    if (body.mode === "raw") {
      try {
        const bodyObj = JSON.parse(body.raw);
        const enhancedBody = this.generateExampleBody(parameters);

        // Merge existing with enhanced
        const merged = { ...bodyObj, ...enhancedBody };

        return {
          ...body,
          raw: JSON.stringify(merged, null, 2),
          options: {
            raw: {
              language: "json",
            },
          },
        };
      } catch (e) {
        console.warn("Could not parse existing body as JSON");
      }
    }

    return body;
  }

  generateExampleBody(parameters) {
    const example = {};

    for (const [name, param] of Object.entries(parameters)) {
      if (param.type === "string") {
        if (param.format === "id") {
          example[name] = `{{${name}_example}}`;
        } else {
          example[name] = `Example ${name}`;
        }
      } else if (param.type === "integer") {
        example[name] = param.minimum || 1;
      } else if (param.type === "boolean") {
        example[name] = true;
      } else if (param.type === "array") {
        example[name] =
          param.items === "string" ? ["example1", "example2"] : [];
      } else if (param.type === "enum") {
        example[name] = param.allowedValues[0];
      } else if (param.type === "object") {
        example[name] = {};
      }
    }

    return example;
  }

  enhanceQueryParameters(queryParams, parameters) {
    const enhanced = [...queryParams];

    for (const [name, param] of Object.entries(parameters)) {
      const existing = enhanced.find((q) => q.key === name);

      if (existing) {
        existing.description = `${param.description} (${param.type}${param.required ? ", required" : ", optional"})`;
      } else if (param.required === false) {
        enhanced.push({
          key: name,
          value: this.getExampleValue(param),
          description: `${param.description} (${param.type}, optional)`,
          disabled: true,
        });
      }
    }

    return enhanced;
  }

  getExampleValue(param) {
    if (param.type === "string") return "example";
    if (param.type === "integer") return param.minimum || "1";
    if (param.type === "boolean") return "true";
    if (param.type === "enum") return param.allowedValues[0];
    return "";
  }

  generateParameterDocumentation(parameters) {
    let docs = "**Enhanced Parameter Specifications:**\n\n";

    for (const [name, param] of Object.entries(parameters)) {
      const required = param.required ? "**Required**" : "*Optional*";
      const type = param.type;
      const format = param.format ? `, format: "${param.format}"` : "";
      const constraints = this.getConstraintText(param);

      docs += `- \`${name}\` (${type}${format}, ${required})${constraints} - ${param.description}\n`;

      if (param.allowedValues) {
        docs += `  - Allowed values: ${param.allowedValues.map((v) => `"${v}"`).join(", ")}\n`;
      }
    }

    return docs;
  }

  getConstraintText(param) {
    const constraints = [];

    if (param.minimum !== undefined) constraints.push(`>= ${param.minimum}`);
    if (param.maximum !== undefined) constraints.push(`<= ${param.maximum}`);

    return constraints.length > 0 ? `, ${constraints.join(", ")}` : "";
  }
}

// CLI interface
if (require.main === module) {
  const enhancer = new SpecificationEnhancer();

  enhancer
    .enhanceAllCollections()
    .then(() => {
      console.log(
        "\n🎉 API collections enhanced with detailed specifications!",
      );
      console.log('Enhanced collections saved with "_Enhanced" suffix.');
      console.log('Run "make generate" to update combined collections.');
    })
    .catch((error) => {
      console.error("❌ Enhancement failed:", error);
      process.exit(1);
    });
}

module.exports = SpecificationEnhancer;
