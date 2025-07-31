# Developer Guide - primeng-tri-state-checkbox

This guide is for maintainers, contributors, and future AI agents working on this package.

## 📋 Package Overview

- **Package Name**: `primeng-tri-state-checkbox`
- **Main Function**: `turnToTriState` - Universal tri-state cycling function
- **Target**: Angular 19+ with PrimeNG 19+ and Tailwind CSS
- **Build Tool**: tsup for ESM/CJS dual output
- **Repository**: https://github.com/saiful-70/primeng-tri-state-checkbox

## 🚀 Automated CI/CD Workflow

### GitHub Actions Setup

The package uses `.github/workflows/publish.yml` for automated publishing:

1. **Test Job**: Runs on all pushes and PRs
   - Type checking (`npm run type-check`)
   - Building (`npm run build`)

2. **Publish Job**: Runs only on main branch pushes
   - Auto-bumps version based on commit messages
   - Publishes to NPM if version changed
   - Creates git tags

### Commit Message → Version Mapping

| Commit Message Pattern | Version Bump | Example |
|------------------------|--------------|---------|
| `fix:`, `patch:`, `bug:` | **Patch** | 1.0.0 → 1.0.1 |
| `feat:`, `feature:` | **Minor** | 1.0.0 → 1.1.0 |
| `major:`, `BREAKING CHANGE:` | **Major** | 1.0.0 → 2.0.0 |
| Other (`docs:`, `chore:`, etc.) | **None** | No publish |

### Required GitHub Secrets

- `NPM_TOKEN`: Automation token from npmjs.com

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Development mode (watch)
npm run dev

# Type checking
npm run type-check

# Build distribution
npm run build

# Test the build
npm pack --dry-run
```

## 📁 Project Structure

```
src/
├── index.ts           # Main exports
├── tri-state.ts       # Core tri-state functions
└── primeng-utils.ts   # PrimeNG-specific utilities

.github/workflows/
└── publish.yml        # Automated CI/CD

dist/                  # Build output (ESM + CJS)
├── index.js          # CommonJS
├── index.mjs         # ES Modules
├── index.d.ts        # TypeScript definitions
└── *.map             # Source maps
```

## 🔧 Key Functions Architecture

### Core Function: `turnToTriState`

```typescript
// Overloaded function that handles both FormControls and direct values
export function turnToTriState<T extends TriStateFormControl | boolean | null>(
  input: T
): T extends TriStateFormControl ? void : boolean | null
```

**Design Decision**: Single function for multiple use cases to simplify API.

### Supporting Functions

- `cycleTriState()`: Pure function for value cycling
- `getPrimeNGTriStateProps()`: PrimeNG component integration
- `getTriStateTailwindClasses()`: Styling utilities
- `getTriStateIcon()`: Icon helpers

## 📝 Making Changes

### 1. Code Changes
```bash
# Make your changes in src/
# Follow existing patterns and TypeScript strict mode
```

### 2. Commit with Proper Message
```bash
# For new features
git commit -m "feat: add new utility function"

# For bug fixes  
git commit -m "fix: resolve edge case in cycling"

# For breaking changes
git commit -m "major: change function signature

BREAKING CHANGE: turnToTriState now requires different parameters"
```

### 3. Push to Main
```bash
git push origin main
# 🎉 Automatic: version bump → build → publish → tag
```

## 🧪 Testing Strategy

Currently using:
- TypeScript compilation as primary validation
- Build verification
- Manual testing with example-usage.ts

**Future improvements**: Add unit tests for core functions.

## 📦 Publishing Details

### Automated Process
1. GitHub Actions detects commit message
2. Bumps version in package.json
3. Commits version change `[skip ci]`
4. Builds package
5. Publishes to NPM
6. Creates git tag (e.g., `v1.2.3`)

### Manual Override (if needed)
```bash
# If automation fails, manual process:
npm version patch  # or minor/major
npm run build
npm publish
git tag v$(node -p "require('./package.json').version")
git push origin --tags
```

## 🎯 Package.json Key Configuration

```json
{
  "main": "./dist/index.js",           // CommonJS entry
  "module": "./dist/index.mjs",        // ESM entry  
  "types": "./dist/index.d.ts",        // TypeScript definitions
  "exports": {                         // Node.js exports map
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",     // ESM
      "require": "./dist/index.js"      // CJS
    }
  },
  "files": ["dist", "README.md"],      // Published files
  "peerDependencies": {                // User must install
    "@angular/forms": ">=19.0.0",
    "primeng": ">=19.0.0"
  }
}
```

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**: Check TypeScript errors with `npm run type-check`
2. **Publish fails**: Verify NPM_TOKEN secret in GitHub
3. **Version not bumping**: Check commit message format
4. **Import errors**: Verify exports in package.json

### Debug Commands
```bash
# Check what files will be published
npm pack --dry-run

# Verify package on NPM
npm view primeng-tri-state-checkbox

# Check GitHub Actions logs
# → GitHub repository → Actions tab
```

## 🎨 Code Style Guidelines

- Use TypeScript strict mode
- Export functions with JSDoc documentation
- Prefer functional programming patterns
- Meaningful function and variable names
- Tree-shakeable exports

## 🚦 Release Checklist

For major releases:

- [ ] Update README with new features
- [ ] Update example-usage.ts if API changed
- [ ] Verify peer dependency versions
- [ ] Test with real Angular project
- [ ] Use appropriate commit message for version bump
- [ ] Verify published package works correctly

## 🤖 AI Agent Instructions

When working on this package:

1. **Always check current file contents** before editing
2. **Use semantic commit messages** for automatic versioning
3. **Maintain backward compatibility** unless major version
4. **Update both README.md and example-usage.ts** for API changes
5. **Test TypeScript compilation** with `npm run type-check`
6. **Verify build output** with `npm run build`

### Common AI Tasks
```bash
# Add new utility function
# 1. Add to src/tri-state.ts
# 2. Export in src/index.ts  
# 3. Update README examples
# 4. Commit with "feat: add new function"

# Fix bug
# 1. Identify issue in src/
# 2. Fix the problem
# 3. Commit with "fix: resolve issue description"

# Update documentation
# 1. Update README.md
# 2. Update example-usage.ts if needed
# 3. Commit with "docs: update documentation"
```

Remember: The goal is a simple, powerful API centered around `turnToTriState` for Angular developers using PrimeNG tri-state checkboxes.
