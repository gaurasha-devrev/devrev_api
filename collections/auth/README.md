# DevRev Authentication API Collection

## Overview
This collection manages authentication tokens for accessing the DevRev API, providing secure access control and token lifecycle management.

## What are Auth Tokens?
Auth Tokens are secure credentials that authenticate API requests to DevRev. They provide:
- **Secure Access** - Authenticate API requests without exposing passwords
- **Scoped Permissions** - Control what operations tokens can perform  
- **Expiration Management** - Tokens can have limited lifespans for security
- **Audit Trail** - Track token usage and creation

## Available Operations
- **Create Auth Token** - Generate new authentication token
- **Get Auth Token** - Retrieve token details and status
- **List Auth Tokens** - View all tokens for the account
- **Update Auth Token** - Modify token settings and metadata
- **Delete Auth Token** - Revoke and remove tokens

## Key Features
- **Automatic Token Capture** - New tokens are automatically saved to environment
- **Expiration Management** - Set custom expiration dates
- **Scope Control** - Configure read/write permissions
- **Token Metadata** - Add descriptions and display names

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Current authentication token (for creating new tokens)

## Environment Variables Set
When you create tokens, these variables are automatically set:
- `aat` - Primary authentication token for API access
- `token_id` - Token's unique identifier
- `auth_token` - Duplicate of aat for flexibility
- `first_token_id` - First token from list operations

## Token Scopes
Tokens can be configured with different permission scopes:
- **read** - View-only access to resources
- **write** - Create and modify resources
- **admin** - Full administrative access
- **delete** - Permission to remove resources

## Security Best Practices
- **Rotate Tokens Regularly** - Create new tokens and delete old ones
- **Use Minimal Scopes** - Grant only necessary permissions
- **Set Expiration Dates** - Don't create tokens that never expire
- **Monitor Usage** - Track token activity for suspicious behavior

## Usage Flow
1. **Create Auth Token** - Generate new token with appropriate scopes
2. **Verify Token** - Use Get operation to confirm token is active
3. **List Tokens** - Review all tokens for account
4. **Update Token** - Modify display name or metadata
5. **Delete Token** - Revoke tokens that are no longer needed

## Token Lifecycle
- **Creation** - New tokens are immediately active
- **Active Usage** - Tokens authenticate API requests
- **Expiration** - Tokens automatically become invalid after expiry
- **Revocation** - Manually delete tokens to revoke access

## Environment Setup
This collection is typically run first to establish authentication:
1. Use an existing token to create new tokens
2. The new token is automatically saved as `{{aat}}`
3. Other collections use `{{aat}}` for authentication

## Error Handling
The collection includes validation for:
- **Token Creation Success** - Confirms new tokens are properly generated
- **Authentication Failures** - Logs when token creation fails
- **Permission Errors** - Identifies scope-related issues

## Dependencies
- Requires an existing valid token to create new tokens
- Initial token typically obtained through DevRev web interface
- No other collection dependencies

## Notes
- Keep tokens secure and never commit them to version control
- Tokens provide access to your entire DevRev organization
- Different tokens can have different permission levels
- Token creation requires existing authentication
- Expired tokens need to be recreated, not renewed
