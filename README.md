# Figma to Lit Component Generator

This project parses a Figma JSON file and generates Lit web components for each top-level frame/component.

## How it works
- Place your exported Figma JSON as `design.json` in this folder.
- Run `node generate-lit-components-from-figma.js` to generate Lit components for each frame/component.
- Each generated component will use styles and names from the Figma file.

## Files
- `generate-lit-component.js`: Generates a Lit component file from style tokens.
- `generate-lit-components-from-figma.js`: Parses the Figma JSON and calls the generator for each frame/component.
- `design.json`: Example Figma JSON file (replace with your own for real use).
- `index.js`: Example for MCP server integration.

## Usage
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the generator:
   ```bash
   node generate-lit-components-from-figma.js
   ```
3. Generated Lit component files will appear in the project folder.

## Customization
- Extend the parser in `generate-lit-components-from-figma.js` to handle nested components, extract more styles, or generate more complex templates.
