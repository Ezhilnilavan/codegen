import fs from 'fs';
import { generateHtml } from './generateHtml.js';

const testHtmlPath = 'test-figma-page.html';
generateHtml({ outputPath: testHtmlPath });

const html = fs.readFileSync(testHtmlPath, 'utf8');

console.assert(html.includes('<link rel="stylesheet" href="global.css">'), 'Global CSS link missing');
console.assert(html.includes('<div class="header">'), 'Header div missing');
console.assert(html.includes('<div class="main-section">'), 'Main section div missing');
console.assert(html.includes('<div class="footer">'), 'Footer div missing');

fs.unlinkSync(testHtmlPath);
console.log('generateHtml unit test passed.');
