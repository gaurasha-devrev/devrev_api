# DevRev Works (Tickets) API Collection

## Overview
This collection manages DevRev Work Items, which include issues, tickets, features, and other trackable work units in the DevRev platform.

## What are Work Items?
Work Items are the core units of work in DevRev - they can be:
- **Issues** - Bug reports and problems
- **Tickets** - Customer support requests  
- **Features** - New functionality requests
- **Enhancements** - Improvements to existing features

## Available Operations
- **Create Work Item (Issue)** - Creates a new bug/issue
- **Create Work Item (Feature)** - Creates a new feature request
- **Get Work Item** - Retrieves work item details by ID
- **List Work Items** - Lists all work items with filtering
- **Update Work Item** - Updates work item status, priority, etc.
- **Delete Work Item** - Removes a work item

## Key Features
- **Multiple Work Types**: Separate templates for issues and features
- **Variable Chaining**: Work item IDs automatically captured for reuse
- **Rich Content**: Uses realistic descriptions with markdown formatting
- **Priority Management**: Supports P0-P3 priority levels
- **Stage Tracking**: Manages work item lifecycle stages

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token
- `{{part_id}}` - Product/component the work applies to
- `{{dev_user_id}}` - Developer assigned to work
- `{{rev_user_id}}` - Customer who reported the work

## Environment Variables Set
When you create work items, these variables are automatically set:
- `work_id` / `ticket_id` / `issue_id` - Primary work item ID
- `work_display_id` - Human-readable work item identifier
- `feature_id` - Specific ID for feature requests
- `feature_display_id` - Feature's display ID

## Work Item Types

### Issues/Tickets
- Bug reports and problems
- Customer support requests
- Includes steps to reproduce
- Expected vs actual behavior sections

### Features
- New functionality requests
- User stories format
- Acceptance criteria checklists
- Additional context sections

## Priority Levels
- **P0** - Critical/Urgent
- **P1** - High priority
- **P2** - Medium priority (default)
- **P3** - Low priority

## Stage Management
- **triage** - Initial review stage
- **backlog** - Planned for future work
- **in_progress** - Currently being worked on
- **completed** - Finished work

## Usage Flow
1. **Create Part** - First ensure you have a product/component
2. **Create Work Item** - Choose issue or feature template
3. **Get Work Item** - Verify creation and review details
4. **List Work Items** - View all work with filtering options
5. **Update Work Item** - Change priority, stage, or details
6. **Delete Work Item** - Clean up test items

## Dependencies
- Requires `{{part_id}}` from Parts collection
- Benefits from `{{dev_user_id}}` and `{{rev_user_id}}` from Users collection
- Requires valid authentication token

## Filtering Options
When listing work items, you can filter by:
- Work type (issue, ticket, feature)
- Stage name
- Priority level
- Part/product association
- Owner assignment

## Notes
- Work items are central to DevRev's workflow management
- They can be linked to conversations and timeline entries
- Priority and stage changes trigger workflow automations
- Work items support custom fields and tagging
