# DevRev Organizations API Collection

## Overview
This collection manages DevRev Organizations, including both Dev Organizations (development teams/companies) and Rev Organizations (customer organizations), providing comprehensive organization management capabilities.

## What are Organizations in DevRev?
Organizations are structural entities that group users and define organizational boundaries:

### Dev Organizations (Dev Orgs)
- **Development Teams** - Internal software development organizations
- **Engineering Companies** - Organizations building and maintaining products
- **Service Providers** - Companies providing development services
- **Platform Operators** - Organizations running DevRev instances

### Rev Organizations (Rev Orgs)
- **Customer Organizations** - Client companies using your products
- **Enterprise Accounts** - Large customer organizational units
- **Partner Organizations** - Business partners and collaborators
- **Community Groups** - User communities and forums

## Available Operations

### Dev Organizations
- **Get Dev Organization** - Retrieves current dev org details
- **List Dev Organizations** - Shows accessible dev organizations
- **Update Dev Organization** - Modifies dev org properties

### Rev Organizations
- **Create Rev Organization** - Creates new customer organizations
- **Get Rev Organization** - Retrieves rev org details by ID
- **List Rev Organizations** - Shows customer organizations with filtering
- **Update Rev Organization** - Modifies customer org properties
- **Delete Rev Organization** - Removes customer organizations

## Key Features
- **Hierarchical Structure**: Organizations can have sub-organizations
- **Environment Support**: Production, staging, development environments
- **Account Association**: Rev orgs linked to customer accounts
- **User Management**: Organizations contain and manage users
- **Variable Chaining**: Organization IDs automatically captured
- **Access Control**: Permission-based organization access

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token
- `{{account_id}}` - Customer account for rev org association

## Environment Variables Set
Organization operations automatically set these variables:

### Dev Organizations
- `dev_org_id` - Primary dev organization ID
- `dev_org_display_id` - Human-readable dev org identifier
- `first_dev_org_id` - First dev org from list operations

### Rev Organizations
- `rev_org_id` - Primary rev organization ID
- `rev_org_display_id` - Human-readable rev org identifier
- `first_rev_org_id` - First rev org from list operations

## Organization Properties

### Dev Organization Fields
- **id** - Unique organization identifier
- **display_name** - Organization name
- **description** - Purpose and details
- **domain** - Organization domain/website
- **settings** - Configuration and preferences

### Rev Organization Fields
- **display_name** - Customer organization name
- **description** - Organization purpose and context
- **account** - Associated customer account ID
- **environment** - Deployment environment (production/staging)
- **external_ref** - External system reference ID

## Environment Types
- **production** - Live customer environments
- **staging** - Testing and pre-production
- **development** - Development and sandbox
- **demo** - Demonstration and trial environments

## Usage Flow

### Dev Organization Management
1. **Get Current Org** - Retrieve your dev organization details
2. **List Available Orgs** - View accessible dev organizations
3. **Update Org** - Modify organization properties and settings

### Rev Organization Lifecycle
1. **Create Account** - First establish customer account
2. **Create Rev Org** - Set up customer organization
3. **Configure Environment** - Specify production/staging/etc.
4. **Manage Users** - Add customer users to organization
5. **Update as Needed** - Modify properties over time
6. **Delete When Obsolete** - Clean up unused organizations

## Common Use Cases

### Multi-tenant SaaS
```json
{
  "display_name": "Acme Corp Production",
  "account": "account_123",
  "environment": "production",
  "description": "Acme Corporation's production environment"
}
```

### Enterprise Deployment
```json
{
  "display_name": "Enterprise Client - NA Region",
  "account": "enterprise_456",
  "environment": "production",
  "external_ref": "ENT-NA-001"
}
```

### Development Setup
```json
{
  "display_name": "Acme Corp Staging",
  "account": "account_123",
  "environment": "staging",
  "description": "Staging environment for testing"
}
```

## Organization Hierarchy
Organizations can be structured hierarchically:
- **Parent Organizations** - Top-level organizational units
- **Sub-organizations** - Departments, teams, or regions
- **Cross-references** - Links between dev and rev orgs

## Access Control
- **Organization Admins** - Full management permissions
- **Organization Members** - Standard user access
- **External Users** - Limited, specific permissions
- **Service Accounts** - Automated system access

## Dependencies
- **Accounts**: Rev orgs require associated customer accounts
- **Users**: Organizations contain dev users and rev users
- **Parts**: Products can be scoped to organizations
- **Works**: Work items exist within organizational context

## Filtering Options
When listing organizations, you can filter by:
- **Environment** - production, staging, development
- **Account Association** - specific customer accounts
- **Creation Date** - date range filtering
- **Status** - active, inactive, suspended

## Best Practices
- Use clear, descriptive organization names
- Maintain consistent naming conventions
- Properly set environment types
- Regular cleanup of unused organizations
- Document organization purposes and ownership
- Implement proper access controls

## Multi-environment Strategy
- **Separate Organizations** - One org per environment
- **Environment Tagging** - Use environment field consistently
- **Data Isolation** - Keep environments separate
- **Promotion Paths** - Clear development → staging → production

## Integration Patterns
- **CRM Integration** - Sync with customer management systems
- **Identity Providers** - Connect with SSO and auth systems
- **Billing Systems** - Link to subscription and usage tracking
- **Monitoring Tools** - Organization-based alerting and metrics

## Limitations
- Organization names must be unique within scope
- Deletion requires cleanup of associated users and content
- Some properties cannot be changed after creation
- Environment changes may require data migration

## Notes
- Dev orgs typically represent your own organization
- Rev orgs represent your customers' organizations
- Organizations provide security and data boundaries
- Billing and usage often tracked at organization level
- User permissions are organization-scoped
- API access can be restricted by organization
