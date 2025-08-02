import { fetchDesignTokens } from './fetchTokens.js';
import { generateGlobalCss } from './generateCss.js';
import { generateHtml } from './generateHtml.js';
import fs from 'fs';
import path from 'path';

/**
 * Main entry point for the package
 * @param {Object} options
 * @param {string} options.figmaUrl - Figma file URL
 * @param {string} options.mcpUrl - MCP server endpoint for design tokens
 * @param {string} options.outputDir - Output directory for generated files
 */
export async function generateFromFigma({ figmaUrl, mcpUrl, outputDir = '.' }) {
  // Fetch tokens from MCP server
  const tokens = await fetchDesignTokens({ mcpUrl });

  // Write design-tokens.json
  fs.writeFileSync(path.join(outputDir, 'design-tokens.json'), JSON.stringify(tokens, null, 2));

  // Generate global.css
  generateGlobalCss(tokens, path.join(outputDir, 'global.css'));

  // Generate HTML page
  generateHtml({ outputPath: path.join(outputDir, 'figma-page.html') });

  console.log('Design tokens, global CSS, and HTML page generated in', outputDir);
}
