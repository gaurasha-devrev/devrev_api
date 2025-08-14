# DevRev Accounts API Collection

## Overview
This collection provides comprehensive CRUD operations for managing DevRev Accounts, which represent customers or organizations in the DevRev platform.

## What is an Account?
An Account in DevRev represents a customer or organization that uses your product. It serves as a container for related users, work items, and other resources.

## Available Operations
- **Create Account** - Creates a new customer/organization account
- **Get Account** - Retrieves account details by ID  
- **List Accounts** - Lists all accounts with pagination
- **Update Account** - Updates existing account information
- **Delete Account** - Removes an account from the system

## Key Features
- **Variable Chaining**: Account ID is automatically captured and stored for use in subsequent requests
- **Dynamic Data**: Uses Postman's dynamic variables for realistic test data
- **Error Handling**: Includes response validation and error logging

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token
- `{{account_id}}` - Auto-captured from account creation
- `{{account_display_id}}` - Account's human-readable ID
- `{{account_display_name}}` - Account's display name

## Environment Variables Set
When you create an account, the following variables are automatically set:
- `account_id` - For use in other API calls
- `account_display_id` - Human-readable account identifier
- `account_display_name` - Account name for reference

## Usage Flow
1. **Create Account** - Start here to create a new account
2. **Get Account** - Verify the account was created correctly
3. **List Accounts** - View all available accounts
4. **Update Account** - Modify account details as needed
5. **Delete Account** - Clean up test accounts when done

## Sample Account Data
The collection creates accounts with:
- Random company names
- Realistic domain names and websites
- Timestamp-based descriptions
- Enterprise tier settings

## Dependencies
- Requires valid authentication token in `{{aat}}`
- Some operations may depend on having `{{dev_user_id}}` for ownership assignment

## Notes
- Account IDs are used throughout other collections (Works, Users, etc.)
- Accounts serve as the foundation for organizing customer data
- Deleting an account may affect related resources
