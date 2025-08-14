# DevRev API Collections

A comprehensive collection of Postman collections, cURL examples, and documentation for the DevRev API.

## 🚀 Quick Start

### Option 1: Import Ready-to-Use Collections (Recommended)

```bash
# Generate the latest combined collections
make generate

# Import dist/DevRev_Complete_Workspace.postman.json into Postman
```

### Option 2: Use Individual Collections

Each API endpoint category has its own folder with:
- Postman collection file
- cURL command examples  
- Comprehensive documentation
- Response storage folder

## 📁 Project Structure

```
devrev_api/
├── collections/           # Individual API collections
│   ├── accounts/         # Customer/organization management
│   ├── artifacts/        # File and document management
│   ├── auth/            # Authentication tokens
│   ├── conversations/   # Support discussions
│   ├── organizations/   # Dev/Rev organization management
│   ├── parts/           # Products/components
│   ├── search/          # Global search capabilities
│   ├── tags/            # Labeling and categorization
│   ├── timeline/        # Comments and activity tracking
│   ├── users/           # Dev and Rev user management
│   ├── webhooks/        # Event notifications
│   ├── works/           # Issues, tickets, features
│   └── environments/    # Environment configurations
├── gen/                 # Generation scripts
├── dist/               # Generated combined collections
└── Makefile           # Build automation
```

## 🎯 What's Included

### 📊 Statistics
- **13 Collections** with 115+ API endpoints
- **71 cURL Examples** with executable scripts
- **12 Documentation Files** with usage guides
- **Variable Chaining** for seamless workflows
- **Multiple Environments** (Production, Staging, Development)

### 🔧 Generated Files
- `DevRev_Complete_Workspace.postman.json` - **Recommended import file**
- `DevRev_Mega_Collection.postman_collection.json` - Single large collection
- `environments/` - Individual environment files
- `IMPORT_INSTRUCTIONS.md` - Step-by-step import guide

## 📋 Available Collections

| Collection | Description | Endpoints | Documentation |
|------------|-------------|-----------|---------------|
| **Accounts** | Customer/organization management | 5 | [README](collections/accounts/README.md) |
| **Works** | Issues, tickets, features | 6 | [README](collections/works/README.md) |
| **Users** | Dev users and Rev users | 8 | [README](collections/users/README.md) |
| **Auth** | Authentication tokens | 5 | [README](collections/auth/README.md) |
| **Parts** | Products/components | 5 | [README](collections/parts/README.md) |
| **Conversations** | Support discussions | 5 | [README](collections/conversations/README.md) |
| **Timeline** | Comments and activity | 6 | [README](collections/timeline/README.md) |
| **Search** | Global search | 4 | [README](collections/search/README.md) |
| **Artifacts** | File management | 6 | [README](collections/artifacts/README.md) |
| **Organizations** | Org management | 8 | [README](collections/organizations/README.md) |
| **Webhooks** | Event notifications | 8 | [README](collections/webhooks/README.md) |
| **Tags** | Labeling system | 5 | [README](collections/tags/README.md) |

## 🛠️ Build System

### Available Commands

```bash
# Show all available commands
make help

# Install dependencies
make install

# Generate combined collections
make generate

# Validate all JSON files
make test

# Show collection statistics
make stats

# Full build process
make dist

# Clean generated files
make clean
```

### Development Workflow

```bash
# Initial setup
make dev-setup

# Make changes to individual collections
# Then regenerate combined collections
make generate

# Validate changes
make test
```

## 🚀 Usage Examples

### Postman Collections

1. **Import Workspace (Recommended):**
   ```bash
   make generate
   # Import dist/DevRev_Complete_Workspace.postman.json
   ```

2. **Set Environment Variables:**
   - Select environment (Production/Staging/Development)
   - Set `aat` (your DevRev API token)

3. **Follow Variable Chaining:**
   - Create Account → Create Part → Create Users → Create Work Items
   - IDs automatically captured for subsequent requests

### cURL Examples

```bash
# Set your API token
export DEVREV_TOKEN="your_api_token_here"

# Create an account
cd collections/accounts/
./create_account.curl

# Create a work item
cd ../works/
./create_work_issue.curl

# Search across all objects
cd ../search/
./search_everything.curl
```

For detailed cURL usage, see [CURL_USAGE.md](collections/CURL_USAGE.md)

## 🔗 Variable Chaining

The collections are designed with automatic variable chaining:

```
Create Account → ACCOUNT_ID
    ↓
Create Part → PART_ID  
    ↓
Create Dev User → DEV_USER_ID
    ↓
Create Rev User → REV_USER_ID
    ↓
Create Work Item → WORK_ID
    ↓
Create Timeline Entry → TIMELINE_ENTRY_ID
```

Variables are automatically set by successful API responses and used in subsequent requests.

## 🌍 Environment Setup

### Required Environment Variables

```bash
# Authentication
export DEVREV_TOKEN="your_devrev_api_token"

# Object IDs (automatically set by API responses)
export ACCOUNT_ID="account_123"
export WORK_ID="work_456"
export PART_ID="part_789"
# ... and more
```

### Environment Files
- **Production**: `environments/production.postman_environment.json`
- **Staging**: `environments/staging.postman_environment.json`  
- **Development**: `environments/development.postman_environment.json`

## 📚 Documentation

### Collection-Specific Guides
Each collection folder contains:
- `README.md` - Detailed API documentation
- `*.curl` - Executable command examples
- `responses/` - Sample response storage

### General Guides
- [CURL_USAGE.md](collections/CURL_USAGE.md) - cURL examples and tips
- [IMPORT_INSTRUCTIONS.md](dist/IMPORT_INSTRUCTIONS.md) - Postman import guide

## 🔄 Regeneration

The combined collections are generated from individual collection files. When you modify individual collections, regenerate:

```bash
make generate
```

This ensures:
- All individual changes are incorporated
- Variable chaining is updated
- Documentation is current
- Files are validated

## 🛡️ Best Practices

### For API Testing
1. **Use Workspace Import** - Better organization and management
2. **Follow Variable Chain** - Create objects in dependency order
3. **Save Responses** - Store responses in `responses/` folders
4. **Test in Staging** - Verify requests before production

### For Development
1. **Modify Individual Collections** - Don't edit generated files directly
2. **Run Tests** - Validate JSON before committing
3. **Regenerate** - Always regenerate after changes
4. **Document Changes** - Update README files for new endpoints

## 🐛 Troubleshooting

### Common Issues

**Authentication Errors:**
```bash
# Verify token is set
echo $DEVREV_TOKEN

# Check token has required permissions
cd collections/auth/
./list_auth_tokens.curl
```

**Missing Dependencies:**
```bash
# Check system requirements
make check

# Install dependencies
make install
```

**Invalid JSON:**
```bash
# Validate all collection files
make test
```

### Getting Help

1. Check individual collection README files
2. Review [CURL_USAGE.md](collections/CURL_USAGE.md)
3. Validate with `make test`
4. Regenerate with `make generate`

## 🚦 Status

- ✅ **Complete**: All major DevRev API endpoints covered
- ✅ **Tested**: All collections validated and working
- ✅ **Documented**: Comprehensive documentation provided
- ✅ **Automated**: Build system for easy maintenance

## 📄 License

MIT License - See individual files for specific licensing information.

## 🤝 Contributing

1. **Modify Individual Collections** - Edit files in `collections/` folders
2. **Test Changes** - Run `make test` to validate
3. **Regenerate** - Run `make generate` to update combined files
4. **Document** - Update README files as needed

---

**Generated Collections Include 115+ Endpoints Across 13 Categories**

For the latest combined collections, run `make generate` and import `dist/DevRev_Complete_Workspace.postman.json`