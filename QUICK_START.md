# DevRev API - Quick Start Guide

## 🎯 Final Importable JSON Files

Your complete DevRev API collections are ready! Here are the final JSON files you can import into Postman:

### 📁 Generated Files (in `dist/` folder):

#### 🌟 **RECOMMENDED: Complete Workspace**
**File:** `dist/DevRev_Complete_Workspace.postman.json` *(170KB, 5,130 lines)*
- **Best choice for most users**
- Contains all 13 collections organized in a workspace
- Includes environments and variable chaining
- Easy navigation and management

#### 📦 **Alternative: Mega Collection**
**File:** `dist/DevRev_Mega_Collection.postman_collection.json` *(162KB)*
- Single large collection with all 115+ endpoints
- Less organized but complete
- Use if you prefer everything in one collection

#### 🌍 **Environments**
**Folder:** `dist/environments/`
- Individual environment files
- Already included in workspace (recommended)

## 🚀 Import Instructions

### Method 1: Import Workspace (Recommended)
1. Open Postman
2. Click **"Import"** button (top left)
3. Drag & drop `dist/DevRev_Complete_Workspace.postman.json`
4. Click **"Import"**
5. Switch to **"DevRev API Complete Workspace"**

### Method 2: Import Individual Collection
1. Open Postman
2. Click **"Import"** button
3. Drag & drop `dist/DevRev_Mega_Collection.postman_collection.json`
4. Import environment files separately if needed

## ⚙️ Setup After Import

1. **Select Environment:**
   - Choose "Gaurav Prod AP South Test" (or import additional environments)

2. **Set API Token:**
   ```
   Variable: aat
   Value: your_devrev_api_token_here
   ```

3. **Test Setup:**
   - Run "Get Dev Organization" from Auth collection
   - Verify successful response

## 🔗 Variable Chaining Workflow

Follow this order for automatic variable chaining:

```
1. Auth → Create Token (optional)
2. Accounts → Create Account
3. Parts → Create Part  
4. Users → Create Dev User & Rev User
5. Works → Create Work Item
6. Timeline → Add Comments
7. Artifacts → Attach Files
8. Webhooks → Setup Notifications
```

## 🔄 Regenerating Collections

When you make changes to individual collections:

```bash
# Regenerate combined collections
make generate

# Or use npm
npm run generate
```

This updates:
- `dist/DevRev_Complete_Workspace.postman.json`
- `dist/DevRev_Mega_Collection.postman_collection.json`
- Environment files
- Documentation

## 📊 What You Get

### ✅ **Complete API Coverage**
- **13 Collections**: All major DevRev API categories
- **115+ Endpoints**: Comprehensive API coverage
- **71 cURL Examples**: Ready-to-use command-line examples
- **Variable Chaining**: Automatic ID capture between requests

### ✅ **Production Ready**
- **Authentication**: Token-based API authentication
- **Error Handling**: Built-in response validation
- **Environments**: Production, staging, development configs
- **Documentation**: Comprehensive guides for each collection

### ✅ **Developer Friendly**
- **Organized Structure**: Logical grouping by API category
- **Rich Examples**: Realistic request payloads
- **Automated Setup**: Variable chaining eliminates manual ID copying
- **Multiple Formats**: Postman collections + cURL commands

## 📁 Alternative Usage - cURL Commands

If you prefer command-line tools:

```bash
# Set your API token
export DEVREV_TOKEN="your_api_token"

# Navigate to any collection folder
cd collections/works/

# Run executable cURL commands
./create_work_issue.curl
./get_work.curl
./list_works.curl
```

Each collection folder contains:
- Executable `.curl` files
- Detailed `README.md` 
- `responses/` folder for storing API responses

## 🎯 Next Steps

1. **Import the workspace** (`DevRev_Complete_Workspace.postman.json`)
2. **Set your API token** in the environment
3. **Test basic endpoints** (start with Auth → Get Dev Org)
4. **Follow variable chaining** (Account → Part → Users → Works)
5. **Explore individual collections** for detailed examples

## 💡 Pro Tips

- **Save Responses**: Store API responses in `collections/*/responses/` folders
- **Use Workspaces**: The workspace import provides the best organization
- **Chain Variables**: Let Postman automatically capture IDs from responses
- **Read READMEs**: Each collection has detailed documentation
- **Test in Staging**: Use different environments for testing

---

**🎉 You now have a complete DevRev API testing toolkit!**

Import `dist/DevRev_Complete_Workspace.postman.json` and start exploring the DevRev API.

For detailed documentation, see the main [README.md](README.md) file.
