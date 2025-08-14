# DevRev API - Enhanced vs Basic Collections Comparison

## 🎯 **Complete Parameter Specifications Added**

Your feedback was spot-on! Our collections were missing critical parameter details. Here's what we've fixed:

## 📋 **Enhanced Auth Token Creation**

### ✅ **Complete Request Body with ALL Parameters:**
```json
{
  "act_as": "{{dev_user_id}}",
  "aud": ["https://api.devrev.ai", "{{base_url}}"],
  "client_id": "devrev-api-client-{{$timestamp}}",
  "expires_in": 90,
  "grant_type": "urn:devrev:params:oauth:grant-type:token-issue",
  "display_name": "Enhanced API Token - {{$timestamp}}",
  "scopes": ["read", "write", "admin"]
}
```

### 📖 **Detailed Parameter Documentation:**
- **`act_as`** (string, optional, format: "id") - The unique ID of the Dev user or service account to impersonate
- **`aud`** (list of strings, optional) - The expected audience values with respect to the token
- **`client_id`** (string, optional, format: "text") - Application identifier requesting the token
- **`expires_in`** (integer, optional, >=0, <=4294967295) - Token validity lifetime in days
- **`grant_type`** (enum, optional) - Process of obtaining token. Allowed: 'urn:devrev:params:oauth:grant-type:token-issue'
- **`display_name`** (string, optional, format: "text") - Human-readable token name
- **`scopes`** (list of strings, optional) - Permission scopes for the token

### 🔒 **Parameter Validation Examples:**
```javascript
// Pre-request validation script
const expiresIn = parseInt(pm.environment.get('test_expires_in') || '30');
if (expiresIn < 0 || expiresIn > 4294967295) {
    console.error('❌ expires_in must be between 0 and 4294967295');
    pm.environment.set('test_expires_in', '30');
}

// Set valid grant_type
pm.environment.set('valid_grant_type', 'urn:devrev:params:oauth:grant-type:token-issue');
```

## 📋 **Enhanced Account Creation**

### ✅ **Complete Request Body:**
```json
{
  "display_name": "Test Account",
  "artifacts": ["artifact_id_1", "artifact_id_2"],
  "custom_fields": {},
  "custom_schema_spec": {
    "tenant_fragment": true,
    "validate_required_fields": true
  },
  "description": "Test account created via API",
  "domains": ["testcompany.com"],
  "external_refs": ["EXT-ACCT-001"],
  "owned_by": ["{{dev_user_id}}"],
  "tags": [
    {
      "tag": "{{tag_id}}",
      "value": "enterprise"
    }
  ],
  "tier": "enterprise",
  "websites": ["https://www.testcompany.com"]
}
```

### 📖 **Parameter Documentation:**
- **`display_name`** (string, **required**, format: "text") - Name of the account
- **`artifacts`** (array of strings, optional) - The IDs of the artifacts to associate with the account
- **`custom_fields`** (object, optional) - Application-defined custom fields
- **`custom_schema_spec`** (object, optional) - Custom schemas described using identifiers
- **`description`** (string, optional, format: "text") - Description of the account
- **`domains`** (array of strings, optional) - List of company's domain names. Example - ['devrev.ai']
- **`external_refs`** (array of strings, optional) - External refs are unique identifiers from your customer system
- **`owned_by`** (array of strings, optional) - List of Dev users owning this account
- **`tags`** (array of objects, optional) - Tags associated with the account
- **`tier`** (string, optional, format: "text") - The tier of the account
- **`websites`** (array of strings, optional) - List of company websites

## 📋 **Enhanced Work Item Creation**

### ✅ **Complete Request Body:**
```json
{
  "title": "Login system bug",
  "body": "Detailed description with steps to reproduce...",
  "type": "issue",
  "priority": "p2",
  "stage": {
    "name": "triage"
  },
  "applies_to_part": "{{part_id}}",
  "owned_by": ["{{dev_user_id}}"],
  "reported_by": ["{{rev_user_id}}"],
  "custom_fields": {},
  "tags": [{"tag": "{{tag_id}}", "value": "bug"}],
  "artifacts": ["{{artifact_id}}"]
}
```

### 📖 **Parameter Documentation:**
- **`title`** (string, **required**, format: "text") - Title of the work item
- **`body`** (string, optional, format: "text") - Body/description of the work item
- **`type`** (enum, **required**) - Type of work item. Allowed: 'issue', 'ticket', 'feature', 'task', 'bug'
- **`priority`** (enum, optional) - Priority level. Allowed: 'p0', 'p1', 'p2', 'p3'
- **`stage`** (object, optional) - Current stage with name property
  - **`stage.name`** (enum) - Allowed: 'triage', 'backlog', 'in_progress', 'completed', 'cancelled'
- **`applies_to_part`** (string, optional, format: "id") - ID of the part this work item applies to
- **`owned_by`** (array of strings, optional) - List of user IDs who own this work item
- **`reported_by`** (array of strings, optional) - List of user IDs who reported this work item

## 🔧 **Enhanced Collections Features:**

### ✅ **What's Included:**
1. **Complete Parameter Lists** - All available parameters from DevRev API docs
2. **Type Specifications** - string, integer, boolean, array, object, enum
3. **Required vs Optional** - Clear marking of mandatory fields
4. **Format Constraints** - id, text, email, date formats
5. **Validation Rules** - Min/max values, allowed enum values
6. **Realistic Examples** - Proper example values for each parameter
7. **Validation Scripts** - Pre-request parameter validation
8. **Enhanced Documentation** - Detailed descriptions for each parameter

### ✅ **Available Enhanced Collections:**
- **DevRev_Auth_Enhanced_Collection.postman_collection.json** ← Auth with ALL parameters
- **DevRev_Accounts_Collection_Enhanced.postman_collection.json** ← Complete account specs
- **DevRev_Works_Collection_Enhanced.postman_collection.json** ← Full work item specs

## 🚀 **How to Use Enhanced Collections:**

### Method 1: Import Enhanced Workspace
```bash
# Regenerate with enhanced collections
make generate-complete

# Import the updated workspace file:
# dist/DevRev_Complete_Workspace.postman.json
```

### Method 2: Use Individual Enhanced Collections
```bash
# Enhanced collections are in each folder with "_Enhanced" suffix
collections/auth/DevRev_Auth_Enhanced_Collection.postman_collection.json
collections/accounts/DevRev_Accounts_Collection_Enhanced.postman_collection.json
collections/works/DevRev_Works_Collection_Enhanced.postman_collection.json
```

## 🎯 **Result: Production-Ready API Collections**

Now our collections include:
- ✅ **Complete parameter specifications** from DevRev API docs
- ✅ **Proper validation and constraints** 
- ✅ **Real-world examples** with all optional parameters
- ✅ **Type safety** with format specifications
- ✅ **Enum values** with allowed values lists
- ✅ **Validation scripts** to prevent invalid requests

**The enhanced collections now match the exact specifications from https://developer.devrev.ai/beta/api-reference**
