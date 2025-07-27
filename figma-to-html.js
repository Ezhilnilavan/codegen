import fetch from 'node-fetch';
import fs from 'fs';

// CONFIG: Set your Figma API token and file key here
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'YOUR_FIGMA_API_TOKEN';
const FILE_KEY = process.env.FIGMA_FILE_KEY || 'YOUR_FIGMA_FILE_KEY';
const OUTPUT_PATH = './figma-page.html';

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

function extractColor(fill) {
  if (!fill || !fill.color) return '#fff';
  const { r, g, b } = fill.color;
  // Figma colors are 0-1, convert to 0-255
  return `rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)})`;
}

function nodeToHtml(node) {
  let html = '';
  let style = '';
  if (node.fills && node.fills.length > 0) {
    style += `background:${extractColor(node.fills[0])};`;
  }
  if (node.style && node.style.fontSize) {
    style += `font-size:${node.style.fontSize}px;`;
  }
  if (node.cornerRadius) {
    style += `border-radius:${node.cornerRadius}px;`;
  }
  switch (node.type) {
    case 'FRAME':
    case 'GROUP':
      html += `<div style="${style}">`;
      if (node.children) {
        html += node.children.map(child => nodeToHtml(child)).join('');
      }
      html += '</div>';
      break;
    case 'TEXT':
      html += `<p style="${style}">${node.characters || ''}</p>`;
      break;
    case 'RECTANGLE':
      html += `<div style="width:${node.absoluteBoundingBox?.width || 100}px;height:${node.absoluteBoundingBox?.height || 100}px;${style}"></div>`;
      break;
    default:
      html += `<div style="${style}"></div>`;
  }
  return html;
}

async function main() {
  console.log('Fetching Figma file...');
  const figmaData = await fetchFigmaFile();
  const pages = figmaData.document.children || [];
  let html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Figma Export</title></head><body>';
  for (const page of pages) {
    html += `<section><h2>${page.name}</h2>`;
    if (page.children) {
      html += page.children.map(nodeToHtml).join('');
    }
    html += '</section>';
  }
  html += '</body></html>';
  fs.writeFileSync(OUTPUT_PATH, html);
  console.log(`HTML file generated at ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error('Error:', err.message);
});
