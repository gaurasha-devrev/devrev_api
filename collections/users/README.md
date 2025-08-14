# DevRev Users API Collection

## Overview
This collection manages both Developer Users (Dev Users) and Revenue Users (Rev Users) in the DevRev platform, providing complete user management capabilities.

## User Types

### Dev Users
**Internal team members** who work on products and handle customer requests:
- Developers and engineers
- Product managers
- Support agents
- Other internal stakeholders

### Rev Users  
**External customers** who use your products and generate revenue:
- End customers
- Client contacts
- Customer administrators
- External stakeholders

## Available Operations

### Dev Users
- **Create Dev User** - Add new team member
- **Get Dev User** - Retrieve team member details
- **List Dev Users** - View all team members
- **Update Dev User** - Modify team member information

### Rev Users
- **Create Rev User** - Add new customer contact
- **Get Rev User** - Retrieve customer details  
- **List Rev Users** - View all customer contacts
- **Update Rev User** - Modify customer information

## Key Features
- **Dual User Management**: Separate workflows for internal vs external users
- **Variable Chaining**: User IDs automatically captured for cross-collection use
- **Realistic Data**: Uses Postman's dynamic variables for test data
- **Account Association**: Rev users linked to customer accounts

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token
- `{{account_id}}` - Customer account for Rev user association

## Environment Variables Set

### Dev Users
- `dev_user_id` - Primary developer user ID
- `dev_user_display_id` - Human-readable dev user identifier
- `dev_user_email` - Developer's email address
- `first_dev_user_id` - First user from list operations

### Rev Users
- `rev_user_id` - Primary customer user ID
- `rev_user_display_id` - Human-readable rev user identifier
- `rev_user_email` - Customer's email address
- `first_rev_user_id` - First customer from list operations

## User Data Generated
Both user types include:
- **Realistic Names**: Random but believable full names
- **Valid Emails**: Properly formatted email addresses
- **Phone Numbers**: Formatted phone numbers
- **Display Names**: User-friendly identifiers

## Usage Flow

### For Dev Users
1. **Create Dev User** - Add team member to system
2. **Get Dev User** - Verify user creation
3. **List Dev Users** - View team roster
4. **Update Dev User** - Modify team member details

### For Rev Users
1. **Create Account** - First ensure customer account exists
2. **Create Rev User** - Add customer contact to account
3. **Get Rev User** - Verify customer user creation
4. **List Rev Users** - View customer contacts
5. **Update Rev User** - Modify customer details

## Cross-Collection Usage
User IDs from this collection are used in:
- **Works Collection** - Assigning ownership and reporting
- **Accounts Collection** - Associating owners with accounts
- **Conversations Collection** - Adding participants to discussions
- **Parts Collection** - Assigning product ownership

## Account Association
- **Dev Users**: Not tied to specific accounts (internal team)
- **Rev Users**: Must be associated with a customer account
- Rev users inherit permissions from their account context

## Filtering Options
When listing users, you can filter by:
- Account association (for Rev users)
- User status/state
- Creation date ranges
- Email domains

## Dependencies
- **Rev Users** require `{{account_id}}` from Accounts collection
- **Dev Users** have no specific dependencies
- Both require valid authentication token

## Notes
- Dev users typically have broader system access
- Rev users are scoped to their account's data
- User roles and permissions are managed separately
- Email addresses should be unique across the system
- Phone numbers are optional but recommended for contact purposes
