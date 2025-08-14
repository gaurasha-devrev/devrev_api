# DevRev Artifacts API Collection

## Overview
This collection manages DevRev Artifacts, which handle file and document management, including uploads, downloads, attachments, and file metadata across the DevRev platform.

## What are Artifacts?
Artifacts are files and documents that can be attached to various DevRev objects:
- **Documents** - PDFs, Word docs, text files
- **Images** - Screenshots, diagrams, mockups
- **Code Files** - Source code, configuration files
- **Data Files** - CSV, JSON, XML exports
- **Media Files** - Audio, video content
- **Archives** - ZIP files, compressed folders

## Available Operations
- **Create Artifact** - Uploads a new file/document with metadata
- **Create Image Artifact** - Specialized creation for image files
- **Get Artifact** - Retrieves file details and download URL
- **List Artifacts** - Shows all artifacts with filtering
- **List Artifacts for Work Item** - Gets files attached to specific objects
- **Update Artifact** - Modifies file metadata and properties
- **Delete Artifact** - Removes file and associated data

## Key Features
- **File Upload Management**: Secure file upload with pre-signed URLs
- **Metadata Tracking**: File name, type, size, and descriptions
- **Object Association**: Link files to work items, conversations, etc.
- **Tag Support**: Categorize files with tags
- **Variable Chaining**: Artifact IDs automatically captured
- **Download URLs**: Secure, time-limited download links

## Environment Variables Used
- `{{base_url}}` - DevRev API base URL
- `{{aat}}` - Authentication token
- `{{work_id}}` - Work item to associate artifacts with
- `{{tag_id}}` - Tags to categorize artifacts

## Environment Variables Set
When you create artifacts, these variables are automatically set:
- `artifact_id` - Primary artifact ID for subsequent operations
- `artifact_display_id` - Human-readable artifact identifier
- `image_artifact_id` - Specific ID for image artifacts
- `upload_url` - Pre-signed URL for file upload
- `first_artifact_id` - First artifact from list operations

## File Types and Support

### Documents
```json
{
  "name": "requirements.pdf",
  "type": "application/pdf",
  "size": 1048576
}
```

### Images
```json
{
  "name": "screenshot.png",
  "type": "image/png",
  "size": 245760
}
```

### Text Files
```json
{
  "name": "config.txt",
  "type": "text/plain",
  "size": 2048
}
```

### Code Files
```json
{
  "name": "app.js",
  "type": "application/javascript",
  "size": 8192
}
```

## Upload Process
1. **Create Artifact** - Submit file metadata to get upload URL
2. **Upload File** - Use returned URL to upload actual file content
3. **Verify Upload** - Check artifact status and availability
4. **Associate with Objects** - Link to work items, conversations, etc.

## Usage Flow
1. **Prepare File** - Gather file metadata (name, type, size)
2. **Create Artifact** - Initialize artifact record
3. **Upload File** - Use provided upload URL for file content
4. **Attach to Objects** - Associate with work items or conversations
5. **List and Manage** - View, update, or delete as needed

## Common Use Cases

### Bug Report Attachments
- Screenshots showing the issue
- Log files with error details
- Configuration files causing problems
- Screen recordings demonstrating bugs

### Feature Documentation
- Mockups and design files
- Specification documents
- User flow diagrams
- Prototype screenshots

### Support Materials
- Customer-provided files
- Environment configurations
- Error logs and dumps
- Installation guides

## File Size Limits
- **Small Files**: < 1MB (immediate upload)
- **Medium Files**: 1-10MB (standard upload)
- **Large Files**: 10-100MB (chunked upload)
- **Enterprise**: Contact for larger file support

## Security Features
- **Pre-signed URLs**: Secure, time-limited upload/download
- **Access Control**: Permission-based file access
- **Virus Scanning**: Automatic malware detection
- **Encryption**: Files encrypted at rest and in transit

## Metadata Properties

### Required Fields
- **name** - File name with extension
- **type** - MIME type (e.g., image/png, text/plain)
- **size** - File size in bytes

### Optional Fields
- **description** - File purpose and context
- **tags** - Categorization labels
- **applies_to** - Associated object ID
- **visibility** - Access control settings

## Filtering Options
When listing artifacts, you can filter by:
- File type (MIME type)
- Associated object (work item, conversation)
- Tags and categories
- Upload date range
- File size range
- Creator/uploader

## Dependencies
- Requires valid authentication token
- Benefits from `{{work_id}}` for object association
- Can use `{{tag_id}}` for categorization
- May require specific permissions for file operations

## Best Practices
- Use descriptive file names and descriptions
- Categorize files with appropriate tags
- Associate files with relevant objects
- Regularly clean up outdated or duplicate files
- Use appropriate file formats for content type
- Include version information in file names

## Limitations
- File size restrictions apply
- Certain file types may be restricted
- Storage quotas may apply per organization
- Download URLs have expiration times
- Bulk operations may have rate limits

## Error Handling
- **Upload Failures**: Retry with new upload URL
- **File Type Restrictions**: Check allowed types
- **Size Limits**: Compress or split large files
- **Permission Errors**: Verify access rights
- **Network Issues**: Implement retry logic

## Notes
- Upload URLs are single-use and time-limited
- Files are automatically scanned for security
- Metadata can be updated after upload
- Associated objects inherit file permissions
- Deleted artifacts cannot be recovered
- File versioning requires manual management
- Some file types may have preview capabilities
