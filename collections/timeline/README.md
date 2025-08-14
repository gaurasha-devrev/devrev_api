# DevRev Timeline Entries API Collection

## Overview
This collection manages DevRev Timeline Entries, which track all activity, comments, and updates on work items, conversations, and other objects in the DevRev platform.

## What are Timeline Entries?
Timeline Entries are chronological records that capture:
- **Comments** - User discussions and feedback
- **Updates** - Status changes and progress reports
- **System Events** - Automated activity tracking
- **Notifications** - Important alerts and announcements

## Available Operations
- **Create Timeline Entry (Comment)** - Adds a comment to an object
- **Create Timeline Entry (Update)** - Adds a status/progress update
- **Get Timeline Entry** - Retrieves entry details by ID
- **List Timeline Entries for Work Item** - Gets all entries for a specific object
- **List All Timeline Entries** - Lists entries with filtering
- **Update Timeline Entry** - Edits existing entries
- **Delete Timeline Entry** - Removes an entry

## Key Features
- **Rich Text Support**: Markdown formatting for comments and updates
- **Multiple Entry Types**: Comments, updates, system events
- **Variable Chaining**: Entry IDs automatically captured
- **Object Association**: Link entries to work items, conversations, etc.
- **Visibility Control**: Public/private entry visibility
- **Chronological Ordering**: Automatic timestamp tracking

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token
- `{{work_id}}` - Work item to associate timeline entries with

## Environment Variables Set
When you create timeline entries, these variables are automatically set:
- `timeline_entry_id` - Primary timeline entry ID
- `comment_id` - Alias for timeline entry ID (for comments)
- `update_entry_id` - ID for update-type entries
- `first_timeline_entry_id` - First entry from list operations

## Entry Types

### Comments (`timeline_comment`)
- User discussions and feedback
- Questions and answers
- Clarifications and explanations
- Rich markdown formatting support

### Updates (`timeline_update`)
- Progress reports and status changes
- Milestone achievements
- Blockers and resolution updates
- Next steps and planning

### System Events
- Automatic tracking of changes
- Assignment updates
- Priority modifications
- Stage transitions

## Visibility Levels
- **Public** - Visible to all users with access to the object
- **Internal** - Visible only to internal team members
- **Private** - Visible only to the author

## Usage Flow
1. **Create Work Item** - First ensure you have an object to attach entries to
2. **Add Comments** - Capture discussions and feedback
3. **Add Updates** - Track progress and status changes
4. **List Entries** - Review chronological activity
5. **Update Entries** - Edit content as needed
6. **Delete Entries** - Remove inappropriate or outdated content

## Markdown Support
Timeline entries support rich markdown formatting:
- **Bold text** and *italic text*
- `Code snippets` and code blocks
- Lists (bulleted and numbered)
- > Blockquotes for emphasis
- Links and references
- Emojis and special characters

## Common Use Cases

### Bug Report Comments
```markdown
**Reproduction Steps Updated:**
1. Navigate to login page
2. Enter invalid credentials
3. System shows generic error (should be specific)

**Root Cause:** Validation logic not properly handling edge cases
```

### Progress Updates
```markdown
🔄 **Sprint Progress - Week 2**

**Completed:**
- ✅ API endpoint implementation
- ✅ Unit tests added
- ✅ Code review passed

**In Progress:**
- 🔨 Integration testing
- 🔨 Documentation updates

**Blockers:**
- ⚠️ Waiting for staging environment setup
```

### Customer Feedback
```markdown
**Customer Feedback - {{customer_name}}**

> The new feature is working great, but we'd like to see:
> - Faster loading times
> - Better mobile experience
> - Export functionality

**Priority:** High
**Follow-up:** Schedule call to discuss requirements
```

## Dependencies
- Requires valid authentication token
- Benefits from `{{work_id}}` from Works collection
- Can reference other timeline entries
- Supports tagging and mentions

## Filtering Options
When listing timeline entries, you can filter by:
- Object ID (work item, conversation, etc.)
- Entry type (comment, update, system)
- Date range (before/after timestamps)
- Author/creator
- Visibility level

## Best Practices
- Use descriptive titles and clear formatting
- Include timestamps and context in updates
- Reference related work items and users
- Use consistent formatting across your team
- Keep comments focused and relevant
- Update entries rather than creating duplicates

## Notes
- Timeline entries are chronologically ordered
- System events are automatically generated
- Entries support real-time notifications
- Deleted entries may leave audit trails
- Rich text rendering varies by client application
- Attachments can be referenced via artifacts
