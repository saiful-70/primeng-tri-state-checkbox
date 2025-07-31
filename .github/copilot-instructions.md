<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Tri-State Checkbox Library - Copilot Instructions

This is a TypeScript npm package for tri-state checkbox functionality in Angular applications with PrimeNG and Tailwind CSS support.

## Project Context
- **Purpose**: Utility library for tri-state checkboxes (null → true → false → null)
- **Target Framework**: Angular with PrimeNG 19+ and Tailwind CSS
- **Package Type**: TypeScript library with ESM/CJS dual output
- **Build Tool**: tsup for fast bundling

## Code Style Guidelines
- Use TypeScript with strict mode enabled
- Export functions with clear JSDoc documentation
- Prefer functional programming patterns
- Use meaningful function and variable names
- Include comprehensive type definitions

## Architecture Patterns
- Core utilities in `src/tri-state.ts`
- PrimeNG-specific utilities in `src/primeng-utils.ts`
- Main exports in `src/index.ts`
- Tree-shakeable exports for optimal bundle size

## Dependencies
- Peer dependencies: `@angular/forms` and `primeng`
- Build dependencies: `typescript`, `tsup`, `@types/node`
- No runtime dependencies to keep package lightweight

## Key Functions to Maintain
- `cycleTriState()`: Core tri-state cycling logic
- `turnToTriState()`: FormControl integration
- `getPrimeNGTriStateProps()`: PrimeNG component props
- `getTriStateTailwindClasses()`: Tailwind CSS utilities

## Testing Considerations
- Test tri-state cycling logic thoroughly
- Verify FormControl integration
- Test PrimeNG component compatibility
- Validate TypeScript type definitions

## Build Process
- `npm run build`: Build distribution files
- `npm run dev`: Watch mode for development
- `npm run type-check`: TypeScript validation
- Output: ESM and CJS formats with type definitions
