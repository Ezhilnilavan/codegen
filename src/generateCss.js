import fs from 'fs';

export function generateGlobalCss(tokens, outputPath = 'global.css') {
  const css = `
:root {
  --color-primary: ${tokens.colorPrimary};
  --color-background: ${tokens.colorBackground};
  --color-footer: ${tokens.colorFooter};
  --font-size-header: ${tokens.fontSizeHeader};
  --font-size-main: ${tokens.fontSizeMain};
  --font-size-footer: ${tokens.fontSizeFooter};
  --border-radius-header: ${tokens.borderRadiusHeader};
  --border-radius-main: ${tokens.borderRadiusMain};
  --border-radius-footer: ${tokens.borderRadiusFooter};
}

.header {
  background: var(--color-primary);
  font-size: var(--font-size-header);
  border-radius: var(--border-radius-header);
  color: #fff;
  padding: 16px;
}

.main-section {
  background: var(--color-background);
  font-size: var(--font-size-main);
  border-radius: var(--border-radius-main);
  color: #222;
  padding: 16px;
}

.footer {
  background: var(--color-footer);
  font-size: var(--font-size-footer);
  border-radius: var(--border-radius-footer);
  color: #fff;
  padding: 16px;
}
`;
  fs.writeFileSync(outputPath, css.trim());
}
