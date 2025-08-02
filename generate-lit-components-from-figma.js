import fs from 'fs';
import path from 'path';
import { generateLitComponent } from './generate-lit-component.js';

// Load Figma JSON (mock structure for demo)
const designJsonPath = './design.json';
if (!fs.existsSync(designJsonPath)) {
  console.error('design.json not found. Please export your Figma file as JSON and place it here.');
  process.exit(1);
}
const design = JSON.parse(fs.readFileSync(designJsonPath, 'utf8'));

// Helper to extract styles from a Figma node
function extractStyles(node) {
  return {
    colorPrimary: node.fills?.[0]?.color || '#fff',
    fontSize: node.style?.fontSize ? node.style.fontSize + 'px' : '16px',
    borderRadius: node.cornerRadius ? node.cornerRadius + 'px' : '8px',
  };
}

// Iterate over top-level frames/components
const components = design.document?.children || [];
components.forEach((node) => {
  if (node.type === 'FRAME' || node.type === 'COMPONENT') {
    const styles = extractStyles(node);
    const name = node.name.replace(/\s+/g, '');
    const outputDir = path.join('./components');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    const outputPath = path.join(outputDir, `${name}.js`);
    generateLitComponent(styles, outputPath);
    console.log(`Generated Lit component: ${outputPath}`);
  }
});
