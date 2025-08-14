#!/usr/bin/env node

/**
 * Script to generate missing DevRev API collections
 * Based on the DevRev API reference at https://developer.devrev.ai/beta/api-reference
 */

const fs = require("fs-extra");
const path = require("path");

const MISSING_APIS = [
  // High Priority
  {
    name: "ai-agents",
    priority: "high",
    description: "AI agent management and operations",
  },
  {
    name: "incidents",
    priority: "high",
    description: "Incident tracking and management",
  },
  {
    name: "metrics",
    priority: "high",
    description: "Analytics and reporting system",
  },
  {
    name: "slas",
    priority: "high",
    description: "Service level agreements management",
  },
  {
    name: "sys-users",
    priority: "high",
    description: "System user management",
  },
  {
    name: "chats",
    priority: "high",
    description: "Chat and messaging features",
  },
  {
    name: "meetings",
    priority: "high",
    description: "Meeting management system",
  },
  {
    name: "schedules",
    priority: "high",
    description: "Time and scheduling management",
  },

  // Medium Priority
  {
    name: "articles",
    priority: "medium",
    description: "Knowledge base and documentation",
  },
  {
    name: "compliance",
    priority: "medium",
    description: "Compliance and audit features",
  },
  {
    name: "customization",
    priority: "medium",
    description: "Custom fields and workflows",
  },
  {
    name: "directory",
    priority: "medium",
    description: "User directory and lookup",
  },
  {
    name: "engagements",
    priority: "medium",
    description: "Customer engagement tracking",
  },
  {
    name: "links",
    priority: "medium",
    description: "Link management and tracking",
  },
  {
    name: "preferences",
    priority: "medium",
    description: "User and system preferences",
  },
  {
    name: "question-answers",
    priority: "medium",
    description: "Q&A management system",
  },
  {
    name: "recommendations",
    priority: "medium",
    description: "AI-powered recommendations",
  },
  {
    name: "surveys",
    priority: "medium",
    description: "Survey and feedback management",
  },

  // Specialized
  {
    name: "airdrop",
    priority: "low",
    description: "File sharing and distribution",
  },
  {
    name: "atoms",
    priority: "low",
    description: "Atomic operations and transactions",
  },
  {
    name: "brands",
    priority: "low",
    description: "Brand and visual identity management",
  },
  {
    name: "code-changes",
    priority: "low",
    description: "Code change tracking",
  },
  {
    name: "commands",
    priority: "low",
    description: "Command execution and management",
  },
  {
    name: "auth-connections",
    priority: "low",
    description: "External auth integrations",
  },
  {
    name: "event-sources",
    priority: "low",
    description: "Event sourcing and streaming",
  },
  { name: "keyrings", priority: "low", description: "Security key management" },
  {
    name: "record-templates",
    priority: "low",
    description: "Template management",
  },
  {
    name: "snap-ins",
    priority: "low",
    description: "Plugin/extension management",
  },
  {
    name: "snap-kit-execution",
    priority: "low",
    description: "Plugin execution environment",
  },
  { name: "snap-widgets", priority: "low", description: "Widget management" },
  {
    name: "subscribers",
    priority: "low",
    description: "Subscription management",
  },
  { name: "uoms", priority: "low", description: "Units of measurement" },
  {
    name: "vistas",
    priority: "low",
    description: "View and dashboard management",
  },
  {
    name: "web-crawler-job",
    priority: "low",
    description: "Web crawling operations",
  },
  { name: "widgets", priority: "low", description: "UI widget management" },
];

class MissingCollectionGenerator {
  constructor() {
    this.collectionsDir = path.join(__dirname, "..", "collections");
  }

  async generateMissingCollections(priority = "high") {
    console.log(
      `🚀 Generating missing DevRev API collections (${priority} priority)...`,
    );

    const apis = MISSING_APIS.filter((api) => api.priority === priority);

    for (const api of apis) {
      await this.createCollectionStructure(api);
      console.log(`✓ Created ${api.name} collection`);
    }

    console.log(
      `✅ Generated ${apis.length} collections for ${priority} priority APIs`,
    );
  }

  async createCollectionStructure(api) {
    const collectionDir = path.join(this.collectionsDir, api.name);
    await fs.ensureDir(path.join(collectionDir, "responses"));

    // Create Postman collection
    const collection = this.generatePostmanCollection(api);
    await fs.writeJson(
      path.join(
        collectionDir,
        `DevRev_${this.toPascalCase(api.name)}_Collection.postman_collection.json`,
      ),
      collection,
      { spaces: 2 },
    );

    // Create cURL files
    await this.generateCurlFiles(api, collectionDir);

    // Create README
    await this.generateReadme(api, collectionDir);
  }

  generatePostmanCollection(api) {
    const className = this.toPascalCase(api.name);
    const apiUrl = api.name.replace("-", "-");

    return {
      info: {
        _postman_id: this.generateId(),
        name: `DevRev - ${className} API`,
        description: `Collection for DevRev ${className} API operations - ${api.description}`,
        schema:
          "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        _exporter_id: "12345678",
      },
      item: [
        {
          name: `Create ${className}`,
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "if (pm.response.code === 201) {",
                  "    const response = pm.response.json();",
                  `    if (response.${api.name.replace("-", "_")}) {`,
                  `        pm.environment.set('${api.name.replace("-", "_")}_id', response.${api.name.replace("-", "_")}.id);`,
                  `        console.log('${className} created with ID:', response.${api.name.replace("-", "_")}.id);`,
                  "    }",
                  "}",
                ],
                type: "text/javascript",
              },
            },
          ],
          request: {
            method: "POST",
            header: [
              { key: "Authorization", value: "Bearer {{aat}}", type: "text" },
              { key: "Content-Type", value: "application/json", type: "text" },
            ],
            body: {
              mode: "raw",
              raw: `{\n  "display_name": "Test ${className}",\n  "description": "Test ${api.name} created via API"\n}`,
            },
            url: {
              raw: `https://{{base_url}}/${apiUrl}.create`,
              protocol: "https",
              host: ["{{base_url}}"],
              path: [`${apiUrl}.create`],
            },
            description: `Creates a new ${api.name}`,
          },
        },
        {
          name: `List ${className}s`,
          request: {
            method: "GET",
            header: [
              { key: "Authorization", value: "Bearer {{aat}}", type: "text" },
            ],
            url: {
              raw: `https://{{base_url}}/${apiUrl}.list?limit=20`,
              protocol: "https",
              host: ["{{base_url}}"],
              path: [`${apiUrl}.list`],
              query: [{ key: "limit", value: "20" }],
            },
            description: `Lists all ${api.name}s`,
          },
        },
      ],
      variable: [{ key: "base_url", value: "api.devrev.ai", type: "string" }],
    };
  }

  async generateCurlFiles(api, collectionDir) {
    const className = this.toPascalCase(api.name);
    const apiUrl = api.name.replace("-", "-");
    const varName = api.name.replace("-", "_").toUpperCase();

    // Create curl
    const createCurl = `#!/bin/bash
# Create a new ${api.name}

curl -X POST "https://api.devrev.ai/${apiUrl}.create" \\
  -H "Authorization: Bearer $DEVREV_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "display_name": "Test ${className}",
    "description": "Test ${api.name} created via API"
  }'`;

    // List curl
    const listCurl = `#!/bin/bash
# List all ${api.name}s

curl -X GET "https://api.devrev.ai/${apiUrl}.list?limit=20" \\
  -H "Authorization: Bearer $DEVREV_TOKEN"`;

    await fs.writeFile(
      path.join(collectionDir, `create_${api.name.replace("-", "_")}.curl`),
      createCurl,
    );
    await fs.writeFile(
      path.join(collectionDir, `list_${api.name.replace("-", "_")}.curl`),
      listCurl,
    );

    // Make executable
    await fs.chmod(
      path.join(collectionDir, `create_${api.name.replace("-", "_")}.curl`),
      0o755,
    );
    await fs.chmod(
      path.join(collectionDir, `list_${api.name.replace("-", "_")}.curl`),
      0o755,
    );
  }

  async generateReadme(api, collectionDir) {
    const className = this.toPascalCase(api.name);

    const readme = `# DevRev ${className} API Collection

## Overview
This collection manages DevRev ${className}, which handles ${api.description}.

## Available Operations
- **Create ${className}** - Creates a new ${api.name}
- **List ${className}s** - Lists all ${api.name}s with filtering

## Environment Variables Used
- \`{{base_url}}\` - DevRev API base URL
- \`{{aat}}\` - Authentication token

## Environment Variables Set
- \`${api.name.replace("-", "_")}_id\` - Primary ${api.name} ID

## Usage Flow
1. **Create ${className}** - Set up new ${api.name}
2. **List ${className}s** - View all available ${api.name}s

## Dependencies
- Requires valid authentication token
- May require specific permissions for ${api.name} operations

## Notes
- This collection covers basic ${api.name} operations
- Additional endpoints may be available in the DevRev API
- See [DevRev API Reference](https://developer.devrev.ai/beta/api-reference) for complete documentation
`;

    await fs.writeFile(path.join(collectionDir, "README.md"), readme);
  }

  toPascalCase(str) {
    return str
      .split("-")
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
  const priority = process.argv[2] || "high";
  const generator = new MissingCollectionGenerator();

  generator
    .generateMissingCollections(priority)
    .then(() => {
      console.log(`\n🎉 Missing ${priority} priority collections generated!`);
      console.log('Run "make generate" to update combined collections.');
    })
    .catch((error) => {
      console.error("❌ Generation failed:", error);
      process.exit(1);
    });
}

module.exports = MissingCollectionGenerator;
