# DevRev Parts API Collection

## Overview
This collection manages DevRev Parts, which represent products, components, capabilities, and features in your product hierarchy.

## What are Parts?
Parts are the building blocks of your product structure in DevRev:
- **Products** - High-level offerings or applications
- **Components** - Subsystems or modules within products  
- **Capabilities** - Functional areas or features
- **Features** - Specific functionality or enhancements

## Available Operations
- **Create Part** - Add new product/component to hierarchy
- **Get Part** - Retrieve part details by ID
- **List Parts** - View all parts with filtering options
- **Update Part** - Modify part information and metadata
- **Delete Part** - Remove parts from the system

## Key Features
- **Hierarchical Structure** - Parts can be organized in parent-child relationships
- **Variable Chaining** - Part IDs automatically captured for use in other collections
- **Ownership Management** - Assign team members as part owners
- **Dynamic Naming** - Uses realistic product names for testing

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token
- `{{dev_user_id}}` - Developer to assign as part owner

## Environment Variables Set
When you create parts, these variables are automatically set:
- `part_id` - Primary part identifier for cross-collection use
- `part_display_id` - Human-readable part identifier
- `part_name` - Part name for reference
- `first_part_id` - First part from list operations

## Part Types
- **product** - Main products or applications
- **capability** - Functional areas within products
- **feature** - Specific features or functionality
- **enhancement** - Improvements to existing capabilities

## Product Hierarchy
Parts can be organized hierarchically:
```
Product (e.g., "DevRev Platform")
├── Capability (e.g., "Issue Tracking")
│   ├── Feature (e.g., "Priority Management")
│   └── Feature (e.g., "Assignment Rules")
└── Capability (e.g., "Customer Communication")
    ├── Feature (e.g., "Email Integration")
    └── Enhancement (e.g., "Real-time Chat")
```

## Usage Flow
1. **Create Part** - Start with a product or high-level component
2. **Get Part** - Verify part creation and review details
3. **List Parts** - View product hierarchy and relationships
4. **Update Part** - Modify descriptions, ownership, or metadata
5. **Delete Part** - Remove unnecessary parts (careful with dependencies)

## Cross-Collection Usage
Part IDs are essential for:
- **Works Collection** - Associating issues/features with products
- **Conversations Collection** - Linking discussions to products
- **Timeline Entries** - Tracking activities by product area

## Ownership and Access
- **Owned By** - Dev users responsible for the part
- **Access Control** - Parts can have visibility restrictions
- **Team Assignment** - Multiple owners can be assigned

## Filtering Options
When listing parts, you can filter by:
- Part type (product, capability, feature, enhancement)
- Owner assignment
- Creation date ranges
- Parent-child relationships

## Schema and Custom Fields
- **Stock Schema** - Standard part attributes
- **Custom Fields** - Organization-specific metadata
- **Schema Fragments** - Reusable schema components

## Dependencies
- Requires valid authentication token
- Benefits from having `{{dev_user_id}}` for ownership assignment
- No other strict dependencies

## Notes
- Parts form the foundation for organizing work and conversations
- Deleting parts may affect associated work items and conversations
- Part hierarchy helps with reporting and analytics
- Ownership affects access permissions and notifications
- Parts can be used for billing and usage tracking
