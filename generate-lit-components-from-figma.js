
import fetch from 'node-fetch';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'YOUR_FIGMA_API_TOKEN';
const FILE_KEY = process.env.FIGMA_FILE_KEY || 'YOUR_FIGMA_FILE_KEY';
const FIGMA_API_URL = `https://api.figma.com/v1/files/${FILE_KEY}`;

async function fetchFigmaFile() {
  const res = await fetch(FIGMA_API_URL, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN
    }
  });
  if (!res.ok) {
    throw new Error(`Figma API error: ${res.status} ${await res.text()}`);
  }
  return await res.json();
}


function extractStyles(node) {
  return {
    colorPrimary: node.fills?.[0]?.color || '#fff',
    fontSize: node.style?.fontSize ? node.style.fontSize + 'px' : '16px',
    borderRadius: node.cornerRadius ? node.cornerRadius + 'px' : '8px',
  };
}

async function main() {
  try {
    const design = await fetchFigmaFile();
    const components = design.document?.children || [];
    for (const node of components) {
      if (node.type === 'FRAME' || node.type === 'COMPONENT') {
        const styles = extractStyles(node);
        const name = node.name.replace(/\s+/g, '');
        const outputDir = path.join('./components');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        const outputPath = path.join(outputDir, `${name}.js`);
        generateLitComponent(styles, outputPath);
        console.log(`Generated Lit component: ${outputPath}`);
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
