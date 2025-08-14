# DevRev API - cURL Usage Guide

## Overview
Each collection folder contains executable cURL command files (`.curl`) that demonstrate how to use the DevRev API endpoints. These files use environment variables for flexibility and reusability.

## Environment Variables Setup

Before running any cURL commands, set these environment variables:

```bash
# Required for all requests
export DEVREV_TOKEN="your_devrev_api_token_here"

# Object IDs (set these after creating objects)
export ACCOUNT_ID="account_id_from_create_response"
export WORK_ID="work_id_from_create_response"  
export TICKET_ID="ticket_id_from_create_response"
export PART_ID="part_id_from_create_response"
export DEV_USER_ID="dev_user_id_from_create_response"
export REV_USER_ID="rev_user_id_from_create_response"
export CONVERSATION_ID="conversation_id_from_create_response"
export TAG_ID="tag_id_from_create_response"
export TIMELINE_ENTRY_ID="timeline_entry_id_from_create_response"
export ARTIFACT_ID="artifact_id_from_create_response"
export WEBHOOK_ID="webhook_id_from_create_response"
export DEV_ORG_ID="dev_org_id_from_get_response"
export REV_ORG_ID="rev_org_id_from_create_response"
export TOKEN_ID="token_id_from_create_response"
```

## Usage Examples

### 1. Create an Account
```bash
cd collections/accounts/
./create_account.curl
```

### 2. Create a Work Item (Issue)
```bash
cd collections/works/
./create_work_issue.curl
```

### 3. Get Work Item Details
```bash
cd collections/works/
./get_work.curl
```

### 4. Search for Work Items
```bash
cd collections/search/
./search_works.curl
```

## Variable Chaining Workflow

Follow this order to create objects with proper dependencies:

1. **Authentication** (optional - if you need a new token)
   ```bash
   cd collections/auth/
   ./create_auth_token.curl
   ```

2. **Create Account** (required for Rev Users and Rev Orgs)
   ```bash
   cd collections/accounts/
   ./create_account.curl
   # Copy account_id from response to ACCOUNT_ID variable
   ```

3. **Create Part** (required for Work Items)
   ```bash
   cd collections/parts/
   ./create_part.curl
   # Copy part_id from response to PART_ID variable
   ```

4. **Create Users**
   ```bash
   cd collections/users/
   ./create_dev_user.curl
   ./create_rev_user.curl
   # Copy user IDs from responses
   ```

5. **Create Work Items**
   ```bash
   cd collections/works/
   ./create_work_issue.curl
   # Copy work_id from response to WORK_ID variable
   ```

6. **Add Timeline Entries**
   ```bash
   cd collections/timeline/
   ./create_timeline_comment.curl
   ```

7. **Create Tags and Artifacts**
   ```bash
   cd collections/tags/
   ./create_tag.curl
   
   cd collections/artifacts/
   ./create_artifact.curl
   ```

## Response Storage

Each collection has a `responses/` folder where you can save API responses for reference:

```bash
cd collections/accounts/
./create_account.curl > responses/create_account_response.json
./list_accounts.curl > responses/list_accounts_response.json
```

## File Structure

Each collection folder contains:
- `*.curl` - Executable cURL command files
- `*.postman_collection.json` - Postman collection
- `README.md` - Collection-specific documentation
- `responses/` - Folder for storing API responses (empty by default)

## Error Handling

If you get authentication errors:
1. Verify your `DEVREV_TOKEN` is set and valid
2. Check that the token has required permissions
3. Ensure the token hasn't expired

If you get "object not found" errors:
1. Verify the environment variables are set correctly
2. Check that referenced objects exist
3. Follow the dependency order outlined above

## Tips

1. **Save Responses**: Redirect output to response files for future reference
   ```bash
   ./create_account.curl > responses/account_response.json
   ```

2. **Extract IDs**: Use `jq` to extract IDs from responses
   ```bash
   ./create_account.curl | jq -r '.account.id'
   ```

3. **Chain Commands**: Create a script to run multiple commands in sequence
   ```bash
   #!/bin/bash
   cd collections/accounts && ./create_account.curl > responses/account.json
   export ACCOUNT_ID=$(cat responses/account.json | jq -r '.account.id')
   cd ../users && ./create_rev_user.curl > responses/rev_user.json
   ```

4. **Test Different Environments**: Change the base URL in curl files for different environments

## Collections Available

- **accounts** - Customer account management
- **artifacts** - File and document management  
- **auth** - Authentication token management
- **conversations** - Support conversation management
- **organizations** - Dev/Rev organization management
- **parts** - Product/component management
- **search** - Global search across all objects
- **tags** - Labeling and categorization
- **timeline** - Comments and activity tracking
- **users** - Dev and Rev user management
- **webhooks** - Event notification management
- **works** - Issue, ticket, and feature management

## Advanced Usage

### Bulk Operations
Create scripts to perform bulk operations:
```bash
#!/bin/bash
for i in {1..10}; do
  cd collections/works/
  ./create_work_issue.curl >> responses/bulk_issues.json
  echo "," >> responses/bulk_issues.json
done
```

### Environment-specific Testing
Use different token variables for different environments:
```bash
export DEVREV_TOKEN_PROD="prod_token"
export DEVREV_TOKEN_STAGING="staging_token"

# Use staging
export DEVREV_TOKEN="your_staging_token_here"
./create_account.curl
```

For more detailed information about each API endpoint, refer to the README.md file in each collection folder.
