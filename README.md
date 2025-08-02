
# figma-lit-gen

Generate Lit components, global CSS, and HTML from Figma design tokens via MCP server. Use in any Next.js app or Node.js project.

## Installation

```bash
npm install figma-lit-gen
```

## Usage

```js
import { generateFromFigma } from 'figma-lit-gen';

await generateFromFigma({
  figmaUrl: 'https://www.figma.com/file/AbC123XyZ9kL/My-Design',
  mcpUrl: 'http://localhost:3001/design-tokens',
  outputDir: './components'
});
```

- This will fetch design tokens from your MCP server, generate `design-tokens.json`, `global.css`, and `figma-page.html` in the output directory.
- You can import generated CSS and components in your Next.js app.

## API

### `generateFromFigma({ figmaUrl, mcpUrl, outputDir })`
- `figmaUrl`: Figma file URL (for reference/documentation)
- `mcpUrl`: MCP server endpoint for design tokens
- `outputDir`: Output directory for generated files

## License
MIT
