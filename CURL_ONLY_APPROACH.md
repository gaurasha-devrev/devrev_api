# DevRev API - cURL-Only Approach

## 🎯 **Single Source of Truth: cURL Files**

This is a **much cleaner approach** - instead of maintaining both cURL files AND Postman collection JSONs, we now:

✅ **Maintain only cURL files** (single source of truth)  
✅ **Generate Postman JSON** directly from cURL commands  
✅ **No duplication** or sync issues  
✅ **Simpler maintenance** - just update the cURL files  

## 📊 **Results: 74 Endpoints from cURL Files**

```
Found 74 cURL files across 14 collections:
✓ Accounts: 5 requests
✓ Artifacts: 6 requests  
✓ Auth: 5 requests
✓ Conversations: 5 requests
✓ Notifications: 1 request
✓ Organizations: 8 requests
✓ Parts: 5 requests
✓ Search: 4 requests
✓ Service-accounts: 2 requests
✓ Tags: 5 requests
✓ Timeline: 6 requests
✓ Users: 8 requests
✓ Webhooks: 8 requests
✓ Works: 6 requests
```

## 🚀 **How it Works**

### **1. Source: cURL Files**
```bash
collections/accounts/create_account.curl
collections/accounts/get_account.curl
collections/accounts/list_accounts.curl
# ... etc
```

### **2. Generator: cURL → Postman**
```bash
# Generate Postman collections from cURL files
make generate-from-curl

# Or directly:
node gen/curl-to-postman.js
```

### **3. Output: Ready-to-Import JSON**
```
dist/DevRev_Complete_Workspace_FromCurl.postman.json
dist/DevRev_Mega_Collection_FromCurl.postman_collection.json
```

## 🔧 **What the Generator Does**

### **Parses cURL Commands:**
```bash
#!/bin/bash
curl -X POST "https://api.devrev.ai/accounts.create" \
  -H "Authorization: Bearer $DEVREV_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "display_name": "Test Account",
    "description": "Test account created via API"
  }'
```

### **Converts to Postman Format:**
```json
{
  "name": "Create Account",
  "request": {
    "method": "POST",
    "header": [
      {"key": "Authorization", "value": "Bearer {{aat}}"},
      {"key": "Content-Type", "value": "application/json"}
    ],
    "body": {
      "mode": "raw",
      "raw": "{\n  \"display_name\": \"Test Account\",\n  \"description\": \"Test account created via API\"\n}",
      "options": {"raw": {"language": "json"}}
    },
    "url": {
      "raw": "https://{{base_url}}/accounts.create",
      "protocol": "https",
      "host": ["{{base_url}}"],
      "path": ["accounts.create"]
    }
  }
}
```

## ✅ **Automatic Features Added**

### **Variable Conversion:**
- `$DEVREV_TOKEN` → `{{aat}}`
- `$ACCOUNT_ID` → `{{account_id}}`
- Environment variable support

### **Response Handling:**
- Auto-generated test scripts
- Variable chaining (capture IDs from responses)
- Success/error logging

### **Collection Organization:**
- Grouped by folder structure
- Proper naming conventions
- Collection-level scripts

## 📁 **New Simplified Workflow**

### **Option 1: Use Existing cURL Files**
```bash
# Generate from current 74 cURL files
make generate-from-curl

# Import: dist/DevRev_Complete_Workspace_FromCurl.postman.json
```

### **Option 2: Clean Slate (Remove JSON Files)**
```bash
# Remove redundant .postman_collection.json files
find collections/ -name "*.postman_collection.json" -delete

# Keep only cURL files and READMEs
# Generate Postman JSON when needed
make generate-from-curl
```

## 🎯 **Benefits of cURL-Only Approach**

### **✅ Advantages:**
1. **Single Source of Truth** - Only cURL files to maintain
2. **No Duplication** - Eliminates sync issues between formats
3. **Simpler Updates** - Just modify cURL files
4. **Version Control Friendly** - Smaller, cleaner diffs
5. **Command Line Ready** - cURL files are immediately executable
6. **Cross-Platform** - Works everywhere curl is available
7. **Documentation** - cURL files serve as API examples

### **✅ Generated Features:**
- Proper Postman collection structure
- Variable chaining and environment support
- Test scripts for response handling
- Collection organization and naming
- Import-ready JSON files

## 🔄 **Migration Strategy**

### **Current State:**
```
collections/accounts/
├── DevRev_Accounts_Collection.postman_collection.json  ← Remove
├── DevRev_Accounts_Collection_Enhanced.postman_collection.json  ← Remove
├── README.md  ← Keep
├── create_account.curl  ← Keep (source of truth)
├── get_account.curl  ← Keep
├── list_accounts.curl  ← Keep
└── responses/  ← Keep
```

### **Target State:**
```
collections/accounts/
├── README.md  ← Keep
├── create_account.curl  ← Source of truth
├── get_account.curl  ← Source of truth
├── list_accounts.curl  ← Source of truth
└── responses/  ← Keep
```

### **Commands:**
```bash
# Remove redundant JSON files
find collections/ -name "*.postman_collection.json" -delete

# Generate from cURL files only
make generate-from-curl

# Result: dist/DevRev_Complete_Workspace_FromCurl.postman.json
```

## 🎉 **Conclusion**

The **cURL-only approach** is:
- ✅ **Simpler** - Single source of truth
- ✅ **Cleaner** - No duplication
- ✅ **More maintainable** - Just edit cURL files
- ✅ **Equally functional** - Generates complete Postman collections
- ✅ **Command-line friendly** - Direct executable examples

**Recommendation:** Adopt the cURL-only approach and remove redundant JSON files.

## 🚀 **Ready-to-Import Files**

Generated from 74 cURL files:
- **`dist/DevRev_Complete_Workspace_FromCurl.postman.json`** ← **Import this**
- **`dist/DevRev_Mega_Collection_FromCurl.postman_collection.json`** ← Alternative

Both files contain the same 74 endpoints, just organized differently.
