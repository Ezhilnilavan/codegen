import fetch from 'node-fetch';
import { generateLitComponent } from './generate-lit-component.js';

const MCP_URL = 'http://localhost:3001/design-tokens';
const OUTPUT_PATH = './MyComponent.js';
const MCP_TOKEN = process.env.MCP_TOKEN || 'YOUR_MCP_API_TOKEN'; // Set your token here or via env

async function main() {
  console.log('Fetching design tokens from MCP server...');
  const res = await fetch(MCP_URL, {
    headers: {
      'Authorization': `Bearer ${MCP_TOKEN}`
    }
  });
  if (!res.ok) {
    console.error('Failed to fetch design tokens:', res.status, await res.text());
    process.exit(1);
  }
  const tokens = await res.json();
  console.log('Tokens received:', tokens);
  generateLitComponent(tokens, OUTPUT_PATH);
  console.log(`Lit component generated at ${OUTPUT_PATH}`);
}

main();
