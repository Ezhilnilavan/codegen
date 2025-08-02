import { generateGlobalCss } from './generateCss.js';
import fs from 'fs';

const tokens = JSON.parse(fs.readFileSync('../sample-design-tokens.json', 'utf8'));
const testCssPath = 'test-global.css';

generateGlobalCss(tokens, testCssPath);

const css = fs.readFileSync(testCssPath, 'utf8');

console.assert(css.includes('--color-primary: #0078D4;'), 'Primary color token missing');
console.assert(css.includes('.header {'), 'Header class missing');
console.assert(css.includes('font-size: var(--font-size-header);'), 'Header font size missing');

fs.unlinkSync(testCssPath);
console.log('generateGlobalCss unit test passed.');
