# DevRev API Collections - Makefile
# Automates generation of combined Postman collections

.PHONY: help install generate clean test validate format dist

# Default target
help: ## Show this help message
	@echo "DevRev API Collections - Build System"
	@echo ""
	@echo "Available targets:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Examples:"
	@echo "  make install    # Install dependencies"
	@echo "  make generate   # Generate combined collections"
	@echo "  make dist       # Full build process"

install: ## Install Node.js dependencies
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✅ Dependencies installed"

generate: ## Generate combined Postman collections
	@echo "🚀 Generating DevRev API collections..."
	@mkdir -p dist
	node gen/generate-combined-collection.js
	@echo "✅ Collections generated in dist/ folder"

clean: ## Clean generated files
	@echo "🧹 Cleaning generated files..."
	rm -rf dist/
	rm -rf node_modules/
	@echo "✅ Clean complete"

test: ## Validate all collection JSON files
	@echo "🔍 Validating collection files..."
	@for file in collections/*/*.postman_collection.json; do \
		echo "Validating $$file..."; \
		node -e "JSON.parse(require('fs').readFileSync('$$file', 'utf8')); console.log('✓ Valid JSON');" || exit 1; \
	done
	@echo "✅ All collection files are valid"

validate: test ## Alias for test target

format: ## Format JavaScript files
	@echo "🎨 Formatting code..."
	npx prettier --write gen/*.js
	@echo "✅ Code formatted"

dist: clean install test generate ## Full build process
	@echo "📦 Creating distribution package..."
	@cp README.md dist/ 2>/dev/null || echo "README.md not found in root"
	@cp collections/CURL_USAGE.md dist/ 2>/dev/null || echo "CURL_USAGE.md not found"
	@echo "✅ Distribution package ready in dist/"

# Development targets
dev-setup: install ## Setup development environment
	@echo "🛠️  Setting up development environment..."
	@chmod +x gen/generate-combined-collection.js
	@echo "✅ Development environment ready"

watch: ## Watch for changes and regenerate (requires entr)
	@echo "👀 Watching for changes (press Ctrl+C to stop)..."
	@find collections/ -name "*.json" | entr -r make generate

quick: ## Quick generation without validation
	@echo "⚡ Quick generation..."
	@node gen/generate-combined-collection.js

# Statistics and info
stats: ## Show collection statistics  
	@echo "📊 DevRev API Collection Statistics:"
	@echo ""
	@echo "Collections: $$(find collections/ -name "*.postman_collection.json" | wc -l | tr -d ' ')"
	@echo "Environments: $$(find collections/environments/ -name "*.json" 2>/dev/null | wc -l | tr -d ' ')"
	@echo "cURL files: $$(find collections/ -name "*.curl" | wc -l | tr -d ' ')"
	@echo "README files: $$(find collections/ -name "README.md" | wc -l | tr -d ' ')"
	@echo ""
	@echo "Collections by type:"
	@for dir in collections/*/; do \
		if [ -f "$$dir"*.postman_collection.json ]; then \
			name=$$(basename "$$dir"); \
			count=$$(find "$$dir" -name "*.curl" | wc -l | tr -d ' '); \
			echo "  $$name: $$count endpoints"; \
		fi \
	done

info: stats ## Alias for stats

# Installation check
check: ## Check if all tools are available
	@echo "🔧 Checking dependencies..."
	@node --version >/dev/null 2>&1 && echo "✅ Node.js available" || (echo "❌ Node.js not found" && exit 1)
	@npm --version >/dev/null 2>&1 && echo "✅ npm available" || (echo "❌ npm not found" && exit 1)
	@jq --version >/dev/null 2>&1 && echo "✅ jq available (optional)" || echo "⚠️  jq not found (optional, used for JSON processing)"
	@which entr >/dev/null 2>&1 && echo "✅ entr available (optional)" || echo "⚠️  entr not found (optional, used for watch mode)"
	@echo "✅ System check complete"

# Default target when no target is specified
.DEFAULT_GOAL := help
