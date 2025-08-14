# DevRev API Collections - Makefile
# Clean and simple automation

.PHONY: help install generate clean format

# Default target
help: ## Show available commands
	@echo "DevRev API Collections - Build System"
	@echo ""
	@echo "Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Usage:"
	@echo "  make install    # Install dependencies"
	@echo "  make generate   # Generate Postman collections from cURL files"
	@echo "  make clean      # Clean generated files"
	@echo "  make format     # Format code"

install: ## Install Node.js dependencies
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✅ Dependencies installed"

generate: ## Generate Postman collections from cURL files
	@echo "🚀 Generating Postman collections from cURL files..."
	@mkdir -p dist
	@chmod +x gen/curl-to-postman.js
	node gen/curl-to-postman.js
	@echo "✅ Collections generated in dist/ folder"
	@echo ""
	@echo "📁 Import this file into Postman:"
	@echo "   dist/DevRev_Complete_Workspace_FromCurl.postman.json"

clean: ## Clean generated files
	@echo "🧹 Cleaning generated files..."
	rm -rf dist/
	rm -rf node_modules/
	@echo "✅ Clean complete"

format: ## Format JavaScript files
	@echo "🎨 Formatting code..."
	npx prettier --write gen/*.js scripts/*.js 2>/dev/null || npx prettier --write gen/*.js
	@echo "✅ Code formatted"

# Default target when no command is specified
.DEFAULT_GOAL := help