import fs from 'fs';

export function generateHtml({ outputPath = 'figma-page.html' } = {}) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Figma Design Page</title>
  <link rel="stylesheet" href="global.css">
</head>
<body>
  <div class="header">
    <h1>Header</h1>
  </div>
  <div class="main-section">
    <h2>Main Section</h2>
  </div>
  <div class="footer">
    <h3>Footer</h3>
  </div>
</body>
</html>
`;
  fs.writeFileSync(outputPath, html);
}
