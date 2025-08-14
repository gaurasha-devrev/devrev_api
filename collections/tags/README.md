# DevRev Tags API Collection

## Overview
This collection manages DevRev Tags, which are used for labeling, categorization, and organizing content across the DevRev platform.

## What are Tags?
Tags are flexible labels that can be applied to various objects in DevRev to:
- **Categorize** work items, conversations, and other objects
- **Filter** and search content efficiently
- **Organize** projects and workflows
- **Track** themes and patterns across issues

## Available Operations
- **Create Tag** - Creates a new tag with name, description, and color
- **Get Tag** - Retrieves tag details by ID
- **List Tags** - Lists all available tags with filtering
- **Update Tag** - Updates tag properties (description, color)
- **Delete Tag** - Removes a tag from the system

## Key Features
- **Color Coding**: Assign colors to tags for visual organization
- **Rich Descriptions**: Add detailed descriptions to tags
- **Variable Chaining**: Tag IDs automatically captured for reuse
- **Flexible Naming**: Support for various tag naming conventions

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token

## Environment Variables Set
When you create tags, these variables are automatically set:
- `tag_id` - Primary tag ID for subsequent operations
- `tag_display_id` - Human-readable tag identifier
- `first_tag_id` - First tag from list operations

## Tag Properties

### Required Fields
- **name** - Unique tag name (slug format recommended)

### Optional Fields
- **description** - Detailed description of tag purpose
- **color** - Hex color code for visual identification

## Usage Flow
1. **Create Tag** - Define new tags for categorization
2. **List Tags** - View all available tags
3. **Get Tag** - Retrieve specific tag details
4. **Update Tag** - Modify tag properties
5. **Delete Tag** - Clean up unused tags

## Common Use Cases

### Project Organization
```
Tags: "frontend", "backend", "database", "ui-ux"
Colors: #3498db, #e74c3c, #f39c12, #9b59b6
```

### Priority Indicators
```
Tags: "critical", "enhancement", "bug-fix", "feature"
Colors: #e74c3c, #2ecc71, #f39c12, #3498db
```

### Team Assignment
```
Tags: "team-alpha", "team-beta", "team-gamma"
Colors: #e67e22, #16a085, #8e44ad
```

## Best Practices
- Use consistent naming conventions (lowercase, hyphens)
- Choose distinctive colors for easy identification
- Provide clear descriptions for tag purposes
- Regularly audit and clean up unused tags
- Use tags consistently across your team

## Dependencies
- Requires valid authentication token
- No dependencies on other collections
- Tags can be applied to various DevRev objects

## Notes
- Tags are global across the organization
- Tag names must be unique within the organization
- Deleted tags are removed from all associated objects
- Color codes should be valid hex values (#RRGGBB)
- Tags support case-insensitive searching and filtering
