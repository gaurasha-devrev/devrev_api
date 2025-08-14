# DevRev Search API Collection

## Overview
This collection provides powerful search capabilities across all objects in the DevRev platform, enabling users to quickly find relevant content through global and targeted search operations.

## What is DevRev Search?
DevRev Search is a comprehensive search engine that indexes and searches across:
- **Work Items** - Issues, tickets, features, and tasks
- **Users** - Dev users and Rev users
- **Conversations** - Support discussions and communications
- **Accounts** - Customer organizations and companies
- **Parts** - Products and components
- **Timeline Entries** - Comments and activity history
- **Artifacts** - Files and documents

## Available Operations
- **Search Everything** - Global search across all object types
- **Search Works** - Targeted search for work items (issues, tickets, features)
- **Search Users** - Find dev users and rev users
- **Search Conversations** - Locate support discussions
- **Search Accounts** - Find customer accounts and organizations
- **Advanced Search with Filters** - Complex queries with specific criteria

## Key Features
- **Global Search**: Single query across all DevRev objects
- **Type-specific Search**: Target specific object types
- **Advanced Filtering**: Priority, stage, date, and custom filters
- **Relevance Ranking**: Results ordered by relevance and recency
- **Variable Chaining**: Search result IDs automatically captured
- **Flexible Queries**: Support for keywords, phrases, and partial matches

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token

## Environment Variables Set
Search operations automatically set these variables:
- `search_result_id` - ID of the first search result
- `search_result_type` - Type of the first search result
- `search_work_id` - ID of first work item in work-specific searches

## Search Types

### Global Search
Searches across all object types simultaneously:
```json
{
  "query": "login issue",
  "limit": 20
}
```

### Type-Specific Search
Focuses on specific object types:
```json
{
  "query": "authentication",
  "types": ["issue", "ticket"],
  "limit": 15
}
```

### Advanced Search with Filters
Combines text search with specific criteria:
```json
{
  "query": "urgent",
  "types": ["issue", "ticket"],
  "filters": {
    "priority": ["p0", "p1"],
    "stage": ["in_progress", "triage"]
  },
  "limit": 25
}
```

## Supported Object Types
- `issue` - Bug reports and problems
- `ticket` - Customer support requests
- `feature` - Feature requests and enhancements
- `dev_user` - Development team members
- `rev_user` - Customer users
- `conversation` - Support discussions
- `account` - Customer organizations
- `part` - Products and components
- `timeline_entry` - Comments and updates
- `artifact` - Files and documents

## Search Query Features

### Text Search
- **Keywords**: Simple word matching
- **Phrases**: Exact phrase matching with quotes
- **Partial Matching**: Finds partial word matches
- **Case Insensitive**: Searches ignore case differences

### Filters
- **Priority**: p0, p1, p2, p3
- **Stage**: triage, backlog, in_progress, completed
- **Date Ranges**: created_date, updated_date
- **Object Properties**: Varies by object type

## Usage Flow
1. **Global Search** - Start with broad queries to explore content
2. **Refine by Type** - Narrow down to specific object types
3. **Apply Filters** - Use advanced filters for precise results
4. **Review Results** - Examine returned objects and metadata
5. **Follow Up** - Use result IDs to fetch full object details

## Common Search Patterns

### Bug Investigation
```json
{
  "query": "login error timeout",
  "types": ["issue", "ticket"],
  "filters": {
    "priority": ["p0", "p1"]
  }
}
```

### User Discovery
```json
{
  "query": "john@company.com",
  "types": ["dev_user", "rev_user"],
  "limit": 10
}
```

### Customer Research
```json
{
  "query": "Acme Corporation",
  "types": ["account", "conversation"],
  "limit": 15
}
```

### Feature Tracking
```json
{
  "query": "mobile app",
  "types": ["feature"],
  "filters": {
    "stage": ["in_progress", "completed"]
  }
}
```

## Search Result Structure
Each search result includes:
- **ID**: Unique object identifier
- **Type**: Object type (issue, user, etc.)
- **Title/Name**: Object display name
- **Summary**: Brief description or excerpt
- **Relevance Score**: Search ranking score
- **Metadata**: Type-specific properties

## Performance Considerations
- **Pagination**: Use `limit` parameter to control result size
- **Specific Types**: Target specific types for faster results
- **Filter Early**: Apply filters to reduce result set
- **Cache Results**: Consider caching for repeated queries

## Dependencies
- Requires valid authentication token
- Search index updates may have slight delays
- Results depend on user access permissions
- Some objects may be filtered by organization settings

## Best Practices
- Start with broad queries, then narrow down
- Use type-specific searches when possible
- Combine multiple filters for precise results
- Test different keyword combinations
- Use quotes for exact phrase matching
- Consider synonyms and alternative terms

## Limitations
- Search results limited by user permissions
- Complex boolean logic not supported
- Real-time indexing may have delays
- Very large result sets may be truncated
- Advanced regex patterns not supported

## Notes
- Search is case-insensitive by default
- Results are ordered by relevance and recency
- Empty queries return recent/popular items
- Search indexes are continuously updated
- Different object types may have different search behaviors
- API rate limits apply to search operations
