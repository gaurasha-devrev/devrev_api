# DevRev Webhooks API Collection

## Overview
This collection manages DevRev Webhooks, which provide real-time event notifications and enable integrations with external systems through HTTP callbacks when specific events occur in DevRev.

## What are Webhooks?
Webhooks are HTTP endpoints that DevRev calls automatically when specific events happen:
- **Event Notifications** - Real-time alerts when objects change
- **System Integration** - Connect DevRev with external tools
- **Workflow Automation** - Trigger actions in other systems
- **Data Synchronization** - Keep external systems updated
- **Custom Workflows** - Build advanced business logic

## Available Operations
- **Create Webhook** - Sets up a new webhook endpoint
- **Create Work-focused Webhook** - Specialized webhook for work item events
- **Get Webhook** - Retrieves webhook configuration and status
- **List Webhooks** - Shows all configured webhooks
- **Update Webhook** - Modifies webhook settings and event types
- **Test Webhook** - Sends a test event to verify webhook functionality
- **Disable Webhook** - Temporarily disables webhook without deletion
- **Delete Webhook** - Permanently removes webhook

## Key Features
- **Real-time Events**: Instant notifications when events occur
- **Flexible Event Types**: Subscribe to specific event categories
- **Secure Delivery**: HTTPS endpoints with signature verification
- **Retry Logic**: Automatic retries for failed deliveries
- **Event Filtering**: Advanced filters to reduce noise
- **Variable Chaining**: Webhook IDs automatically captured
- **Status Monitoring**: Track webhook health and delivery status

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token

## Environment Variables Set
Webhook operations automatically set these variables:
- `webhook_id` - Primary webhook ID for management operations
- `webhook_display_id` - Human-readable webhook identifier
- `work_webhook_id` - ID for work-focused webhooks
- `first_webhook_id` - First webhook from list operations

## Supported Event Types

### Work Item Events
- `work_created` - New work items (issues, tickets, features)
- `work_updated` - Work item modifications
- `work_deleted` - Work item removal
- `work_stage_updated` - Stage/status changes
- `work_priority_updated` - Priority modifications
- `work_assigned` - Assignment changes

### User Events
- `user_created` - New dev/rev users
- `user_updated` - User profile changes
- `user_deleted` - User removal

### Conversation Events
- `conversation_created` - New support conversations
- `conversation_updated` - Conversation modifications
- `message_created` - New messages in conversations

### Account Events
- `account_created` - New customer accounts
- `account_updated` - Account information changes

### Timeline Events
- `timeline_entry_created` - New comments and updates
- `timeline_entry_updated` - Comment modifications

## Webhook Configuration

### Basic Webhook
```json
{
  "url": "https://example.com/webhooks/devrev",
  "event_types": ["work_created", "work_updated"],
  "description": "Basic work item notifications",
  "enabled": true
}
```

### Advanced Webhook with Filtering
```json
{
  "url": "https://integration.company.com/devrev-events",
  "event_types": ["work_created", "work_updated"],
  "filters": {
    "work_types": ["issue", "ticket"],
    "priorities": ["p0", "p1"]
  },
  "secret": "webhook_secret_key",
  "enabled": true
}
```

## Event Payload Structure
Each webhook delivers a JSON payload with:
```json
{
  "event_type": "work_created",
  "timestamp": "2024-01-15T10:30:00Z",
  "webhook_id": "webhook_123",
  "data": {
    "work": {
      "id": "work_456",
      "title": "Bug in login system",
      "type": "issue",
      "priority": "p1"
    }
  },
  "signature": "sha256=..."
}
```

## Security Features

### Signature Verification
Webhooks include HMAC signatures for verification:
```javascript
const crypto = require('crypto');
const signature = req.headers['x-devrev-signature'];
const payload = req.body;
const secret = 'your_webhook_secret';

const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');
```

### HTTPS Requirements
- All webhook URLs must use HTTPS
- Valid SSL certificates required
- Modern TLS versions supported

## Usage Flow
1. **Plan Integration** - Determine required events and endpoint
2. **Create Webhook** - Configure URL and event types
3. **Test Webhook** - Verify endpoint receives events correctly
4. **Handle Events** - Process incoming event payloads
5. **Monitor Health** - Track delivery success and failures
6. **Update as Needed** - Modify event types or endpoint

## Common Integration Patterns

### Slack Notifications
```json
{
  "url": "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK",
  "event_types": ["work_created"],
  "filters": {
    "priorities": ["p0", "p1"]
  }
}
```

### JIRA Synchronization
```json
{
  "url": "https://your-app.com/devrev-to-jira",
  "event_types": [
    "work_created",
    "work_updated",
    "work_stage_updated"
  ]
}
```

### Customer Support Integration
```json
{
  "url": "https://support.company.com/webhooks/devrev",
  "event_types": [
    "conversation_created",
    "message_created",
    "work_created"
  ],
  "filters": {
    "work_types": ["ticket"]
  }
}
```

## Retry and Reliability
- **Automatic Retries**: Failed deliveries retried with exponential backoff
- **Timeout Handling**: 30-second timeout for webhook responses
- **Status Codes**: 2xx responses considered successful
- **Delivery Tracking**: Monitor success/failure rates

## Event Filtering
Advanced filtering reduces webhook noise:

### Priority Filtering
```json
{
  "filters": {
    "priorities": ["p0", "p1"]
  }
}
```

### Type Filtering
```json
{
  "filters": {
    "work_types": ["issue", "ticket"],
    "stages": ["triage", "in_progress"]
  }
}
```

## Dependencies
- Requires valid authentication token
- Target endpoint must be accessible from DevRev
- HTTPS endpoint with valid SSL certificate
- Endpoint should respond quickly (< 30 seconds)

## Best Practices
- Use HTTPS with valid certificates
- Implement signature verification
- Handle events idempotently
- Respond quickly (acknowledge receipt)
- Log webhook events for debugging
- Monitor webhook health and failures
- Use filters to reduce unnecessary events
- Implement proper error handling

## Rate Limiting
- Webhook deliveries respect rate limits
- Failed deliveries use exponential backoff
- Consider endpoint capacity when designing filters
- Monitor delivery patterns and adjust as needed

## Troubleshooting

### Common Issues
- **SSL Certificate Errors**: Ensure valid HTTPS setup
- **Timeout Issues**: Respond within 30 seconds
- **Authentication Failures**: Verify signature calculation
- **Rate Limiting**: Monitor delivery frequency

### Debugging Tips
- Use test webhook functionality
- Check webhook delivery logs
- Verify endpoint accessibility
- Test signature verification logic
- Monitor webhook status and health

## Notes
- Webhook events are delivered at least once
- Events may arrive out of order
- Implement idempotent processing
- Webhook URLs cannot be localhost or private IPs
- Event payloads may evolve over time
- Consider webhook security best practices
- Monitor and alert on webhook failures
