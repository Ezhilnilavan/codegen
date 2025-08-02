import fs from 'fs';
import path from 'path';

export function generateLitComponent(tokens, outputPath) {
  const { colorPrimary, fontSize, borderRadius } = tokens;
  const code = [
    "import { LitElement, html, css } from 'lit';",
    '',
    'export class MyComponent extends LitElement {',
    '  static styles = css`',
    '    .container {',
    `      background: ${colorPrimary};`,
    `      font-size: ${fontSize};`,
    `      border-radius: ${borderRadius};`,
    '      padding: 16px;',
    '      color: #fff;',
    '    }',
    '  `;',
    '',
    '  render() {',
    '    return html`',
    '      <div class="container">',
    '        <h2>Lit Component from MCP Server</h2>',
    '        <p>This uses design tokens from MCP server.</p>',
    '      </div>',
    '    `;',
    '  }',
    '}',
    '',
    "customElements.define('my-component', MyComponent);",
    ''
  ].join('\n');
  // Always write to components folder
  const outputDir = path.join(process.cwd(), 'components');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  const fileName = path.basename(outputPath);
  const finalPath = path.join(outputDir, fileName);
  fs.writeFileSync(finalPath, code);
}
