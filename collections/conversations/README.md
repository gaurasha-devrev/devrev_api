# DevRev Conversations API Collection

## Overview
This collection manages DevRev Conversations, which facilitate communication between team members and customers around support requests, feature discussions, and collaborative work.

## What are Conversations?
Conversations are communication threads that enable:
- **Customer Support** - Help customers resolve issues
- **Feature Discussions** - Collaborate on product requirements
- **Internal Communication** - Team discussions about work items
- **Multi-party Collaboration** - Include multiple stakeholders

## Available Operations
- **Create Conversation** - Start new discussion thread
- **Get Conversation** - Retrieve conversation details and history
- **List Conversations** - View all conversations with filtering
- **Update Conversation** - Modify conversation metadata and status
- **Delete Conversation** - Remove conversation threads

## Key Features
- **Multi-participant** - Include both dev users and rev users
- **Priority Management** - Assign priority levels for triage
- **Stage Tracking** - Monitor conversation lifecycle
- **Product Association** - Link conversations to specific products/parts

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token
- `{{part_id}}` - Product/component the conversation relates to
- `{{dev_user_id}}` - Internal team member participant
- `{{rev_user_id}}` - Customer participant

## Environment Variables Set
When you create conversations, these variables are automatically set:
- `conversation_id` - Primary conversation identifier
- `conversation_display_id` - Human-readable conversation ID
- `conversation_title` - Conversation subject/title
- `first_conversation_id` - First conversation from list operations

## Conversation Types
- **support** - Customer support requests
- **feature_request** - Product enhancement discussions
- **bug_report** - Issue investigation threads
- **general** - General purpose discussions

## Priority Levels
- **P0** - Critical/Urgent customer issues
- **P1** - High priority requests
- **P2** - Standard priority (default)
- **P3** - Low priority discussions

## Conversation Stages
- **new** - Recently created, needs initial review
- **in_progress** - Actively being worked on
- **waiting_customer** - Awaiting customer response
- **waiting_internal** - Awaiting team response
- **resolved** - Issue resolved, conversation complete

## Participant Management
Conversations support multiple participant types:
- **Dev Users** - Internal team members (support agents, developers)
- **Rev Users** - External customers and stakeholders
- **Mixed Participation** - Both internal and external participants

## Usage Flow
1. **Create Users** - Ensure dev and rev users exist
2. **Create Part** - Establish product context
3. **Create Conversation** - Start discussion with participants
4. **Get Conversation** - Review conversation details
5. **List Conversations** - Browse active conversations
6. **Update Conversation** - Change priority/stage as needed

## Cross-Collection Integration
Conversations work with:
- **Timeline Entries** - Add comments and updates
- **Works Collection** - Link to related issues/features
- **Users Collection** - Include participants from both user types
- **Parts Collection** - Associate with products/components

## Filtering Options
When listing conversations, filter by:
- Conversation type
- Priority level
- Stage/status
- Product/part association
- Participant involvement
- Creation date ranges

## Communication Features
- **Rich Text** - Markdown formatting support
- **File Attachments** - Share documents and images
- **Internal Notes** - Private team communications
- **Customer Visibility** - Control what customers can see

## Dependencies
- Requires `{{part_id}}` from Parts collection
- Benefits from `{{dev_user_id}}` and `{{rev_user_id}}` from Users collection
- Requires valid authentication token

## Notes
- Conversations are central to customer communication workflow
- They can spawn work items (issues, features) from discussions
- Stage transitions can trigger automated workflows
- Participants receive notifications based on their involvement
- Conversations maintain full audit trails of all interactions
- Custom fields can be added for organization-specific metadata
