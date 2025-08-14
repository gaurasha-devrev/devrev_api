#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

class PostmanCollectionGenerator {
  constructor() {
    this.collectionsDir = path.join(__dirname, '..', 'collections');
    this.outputDir = path.join(__dirname, '..', 'dist');
    this.timestamp = new Date().toISOString();
  }

  async generateCombinedCollection() {
    console.log('🚀 Starting DevRev API Collection Generation...\n');

    // Ensure output directory exists
    await fs.ensureDir(this.outputDir);

    // Get all individual collections
    const collections = await this.getAllCollections();
    const environments = await this.getAllEnvironments();

    // Generate workspace with all collections
    const workspace = this.createWorkspace(collections, environments);
    
    // Generate single mega-collection
    const megaCollection = this.createMegaCollection(collections);

    // Write outputs
    await this.writeOutput(workspace, megaCollection, environments);

    console.log('✅ Generation complete!\n');
    console.log('📁 Output files:');
    console.log(`   - dist/DevRev_Complete_Workspace.postman.json (recommended)`);
    console.log(`   - dist/DevRev_Mega_Collection.postman_collection.json`);
    console.log(`   - dist/environments/ (individual environment files)`);
    console.log('\n🎯 Import the workspace file for the best experience!');
  }

  async getAllCollections() {
    const collections = [];
    const collectionDirs = await fs.readdir(this.collectionsDir);

    for (const dir of collectionDirs) {
      const dirPath = path.join(this.collectionsDir, dir);
      const stat = await fs.stat(dirPath);
      
      if (stat.isDirectory() && dir !== 'environments') {
        const collectionFiles = await fs.readdir(dirPath);
        const postmanFile = collectionFiles.find(file => 
          file.endsWith('.postman_collection.json')
        );

        if (postmanFile) {
          const collectionPath = path.join(dirPath, postmanFile);
          try {
            const collection = await fs.readJson(collectionPath);
            collections.push({
              name: dir,
              filePath: collectionPath,
              data: collection
            });
            console.log(`✓ Loaded collection: ${collection.info.name}`);
          } catch (error) {
            console.warn(`⚠️  Failed to load collection from ${collectionPath}:`, error.message);
          }
        }
      }
    }

    return collections;
  }

  async getAllEnvironments() {
    const environments = [];
    const envDir = path.join(this.collectionsDir, 'environments');
    
    if (await fs.pathExists(envDir)) {
      const envFiles = await fs.readdir(envDir);
      
      for (const file of envFiles) {
        if (file.endsWith('.postman_environment.json')) {
          const envPath = path.join(envDir, file);
          try {
            const environment = await fs.readJson(envPath);
            environments.push({
              name: file.replace('.postman_environment.json', ''),
              filePath: envPath,
              data: environment
            });
            console.log(`✓ Loaded environment: ${environment.name}`);
          } catch (error) {
            console.warn(`⚠️  Failed to load environment from ${envPath}:`, error.message);
          }
        }
      }
    }

    return environments;
  }

  createWorkspace(collections, environments) {
    const workspaceId = this.generateId();
    
    return {
      info: {
        _postman_id: workspaceId,
        name: "DevRev API Complete Workspace",
        description: `Complete DevRev API workspace with all collections and environments.\n\nGenerated on: ${this.timestamp}\n\nThis workspace includes:\n${collections.map(c => `- ${c.data.info.name}`).join('\n')}\n\nEnvironments:\n${environments.map(e => `- ${e.data.name}`).join('\n')}\n\nFor individual collections and cURL examples, see: https://github.com/devrev/api-collections`,
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
      },
      item: collections.map(collection => ({
        name: collection.data.info.name,
        item: collection.data.item || [],
        event: collection.data.event || [],
        variable: collection.data.variable || []
      })),
      event: [
        {
          listen: "prerequest",
          script: {
            type: "text/javascript",
            exec: [
              "// DevRev API Complete Workspace - Pre-request Script",
              "console.log('DevRev API Request starting...');",
              "",
              "// Ensure base_url is set",
              "if (!pm.environment.get('base_url')) {",
              "    pm.environment.set('base_url', 'api.devrev.ai');",
              "}",
              "",
              "// Log current environment",
              "console.log('Base URL:', pm.environment.get('base_url'));",
              "console.log('Token set:', !!pm.environment.get('aat'));"
            ]
          }
        },
        {
          listen: "test",
          script: {
            type: "text/javascript",
            exec: [
              "// DevRev API Complete Workspace - Post-response Script",
              "console.log('Response received:', pm.response.code, pm.response.status);",
              "",
              "// Log response time",
              "console.log('Response time:', pm.response.responseTime + 'ms');",
              "",
              "// Basic error handling",
              "if (pm.response.code >= 400) {",
              "    console.error('API Error:', pm.response.text());",
              "}"
            ]
          }
        }
      ],
      variable: [
        {
          key: "base_url",
          value: "api.devrev.ai",
          type: "string"
        },
        {
          key: "workspace_version",
          value: "1.0.0",
          type: "string"
        },
        {
          key: "generated_at",
          value: this.timestamp,
          type: "string"
        }
      ]
    };
  }

  createMegaCollection(collections) {
    const megaCollectionId = this.generateId();
    
    return {
      info: {
        _postman_id: megaCollectionId,
        name: "DevRev API - Complete Collection",
        description: `Complete DevRev API collection with all endpoints in a single file.\n\nGenerated on: ${this.timestamp}\n\nThis collection includes all DevRev API endpoints organized by category:\n${collections.map(c => `- ${c.data.info.name}`).join('\n')}\n\nFor better organization, consider importing the workspace file instead.\n\nCurl examples and individual collections available at: https://github.com/devrev/api-collections`,
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        _exporter_id: "devrev-generator"
      },
      item: collections.map(collection => ({
        name: collection.data.info.name.replace('DevRev - ', ''),
        description: collection.data.info.description || `${collection.data.info.name} operations`,
        item: collection.data.item || []
      })),
      event: [
        {
          listen: "prerequest",
          script: {
            type: "text/javascript",
            exec: [
              "// DevRev API Mega Collection - Pre-request Script",
              "console.log('DevRev API Request starting...');",
              "",
              "// Ensure base_url is set",
              "if (!pm.environment.get('base_url')) {",
              "    pm.environment.set('base_url', 'api.devrev.ai');",
              "}",
              "",
              "// Validate required environment variables",
              "const requiredVars = ['aat'];",
              "const missingVars = requiredVars.filter(v => !pm.environment.get(v));",
              "",
              "if (missingVars.length > 0) {",
              "    console.warn('Missing required environment variables:', missingVars.join(', '));",
              "    console.warn('Please set these variables in your environment.');",
              "}"
            ]
          }
        },
        {
          listen: "test",
          script: {
            type: "text/javascript",
            exec: [
              "// DevRev API Mega Collection - Post-response Script",
              "console.log('Response:', pm.response.code, pm.response.status);",
              "console.log('Response time:', pm.response.responseTime + 'ms');",
              "",
              "// Enhanced error handling",
              "if (pm.response.code >= 400) {",
              "    console.error('API Error Details:');",
              "    console.error('Status:', pm.response.code, pm.response.status);",
              "    console.error('Response:', pm.response.text());",
              "} else if (pm.response.code >= 200 && pm.response.code < 300) {",
              "    console.log('✓ Request successful');",
              "}"
            ]
          }
        }
      ],
      variable: [
        {
          key: "base_url",
          value: "api.devrev.ai",
          type: "string"
        }
      ]
    };
  }

  async writeOutput(workspace, megaCollection, environments) {
    // Write workspace file (recommended)
    const workspacePath = path.join(this.outputDir, 'DevRev_Complete_Workspace.postman.json');
    await fs.writeJson(workspacePath, workspace, { spaces: 2 });
    console.log(`✓ Generated workspace: ${workspacePath}`);

    // Write mega collection file
    const megaPath = path.join(this.outputDir, 'DevRev_Mega_Collection.postman_collection.json');
    await fs.writeJson(megaPath, megaCollection, { spaces: 2 });
    console.log(`✓ Generated mega collection: ${megaPath}`);

    // Write individual environment files
    const envOutputDir = path.join(this.outputDir, 'environments');
    await fs.ensureDir(envOutputDir);
    
    for (const env of environments) {
      const envPath = path.join(envOutputDir, `${env.name}.postman_environment.json`);
      await fs.writeJson(envPath, env.data, { spaces: 2 });
      console.log(`✓ Copied environment: ${envPath}`);
    }

    // Create import instructions
    const instructionsPath = path.join(this.outputDir, 'IMPORT_INSTRUCTIONS.md');
    await this.writeImportInstructions(instructionsPath);
    console.log(`✓ Generated instructions: ${instructionsPath}`);

    // Create summary file
    const summaryPath = path.join(this.outputDir, 'generation-summary.json');
    const summary = {
      generated_at: this.timestamp,
      collections_count: workspace.item.length,
      environments_count: environments.length,
      total_endpoints: this.countEndpoints(workspace),
      files_generated: [
        'DevRev_Complete_Workspace.postman.json',
        'DevRev_Mega_Collection.postman_collection.json',
        'environments/',
        'IMPORT_INSTRUCTIONS.md'
      ]
    };
    await fs.writeJson(summaryPath, summary, { spaces: 2 });
    console.log(`✓ Generated summary: ${summaryPath}`);
  }

  async writeImportInstructions(filePath) {
    const instructions = `# DevRev API - Import Instructions

## 📋 Generated Files

### 🎯 Recommended: Complete Workspace
**File:** \`DevRev_Complete_Workspace.postman.json\`
- **Best choice for most users**
- Organized collections in a workspace
- Includes all environments
- Easy to navigate and manage

### 📦 Alternative: Mega Collection  
**File:** \`DevRev_Mega_Collection.postman_collection.json\`
- Single large collection with all endpoints
- Use if you prefer everything in one collection
- Less organized but complete

### 🌍 Environments
**Folder:** \`environments/\`
- Individual environment files
- Import separately or use the workspace (includes them automatically)

## 🚀 How to Import

### Option 1: Import Workspace (Recommended)
1. Open Postman
2. Click "Import" button
3. Drag & drop \`DevRev_Complete_Workspace.postman.json\`
4. Click "Import"
5. Switch to the "DevRev API Complete Workspace"

### Option 2: Import Mega Collection
1. Open Postman  
2. Click "Import" button
3. Drag & drop \`DevRev_Mega_Collection.postman_collection.json\`
4. Import environment files from \`environments/\` folder separately

## ⚙️ Setup After Import

1. **Set Environment Variables:**
   - Select an environment (Production/Staging/Development)
   - Set your \`aat\` (DevRev API token)
   - Other variables will be set automatically by requests

2. **Test the Setup:**
   - Run "Get Dev Organization" from Auth collection
   - Verify you get a successful response

3. **Follow Variable Chaining:**
   - Create objects in order: Account → Part → Users → Work Items
   - IDs are automatically captured for subsequent requests

## 📚 Additional Resources

- **cURL Examples:** See \`collections/\` folder for executable curl files
- **Documentation:** Each collection has detailed README.md
- **Usage Guide:** \`collections/CURL_USAGE.md\`

## 🔄 Regeneration

This file was generated automatically. To regenerate with latest changes:

\`\`\`bash
make generate
# or
npm run generate
\`\`\`

---
Generated on: ${this.timestamp}
`;

    await fs.writeFile(filePath, instructions);
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

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// Run the generator
if (require.main === module) {
  const generator = new PostmanCollectionGenerator();
  generator.generateCombinedCollection()
    .then(() => {
      console.log('\n🎉 DevRev API collections generated successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Generation failed:', error);
      process.exit(1);
    });
}

module.exports = PostmanCollectionGenerator;
