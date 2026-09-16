const fs = require('fs');
const path = require('path');

const files = ['Dashboard', 'Services'];

files.forEach(name => {
  const filePath = path.join(__dirname, 'src', 'pages', `${name}.jsx`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract content inside <main ...> ... </main>
  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (mainMatch) {
    const innerContent = mainMatch[1];
    const finalComponent = `import React from 'react';\nimport { Link } from 'react-router-dom';\n\nexport default function ${name}() {\n  return (\n    <>\n${innerContent}\n    </>\n  );\n}`;
    fs.writeFileSync(filePath, finalComponent);
    console.log(`Cleaned up ${name}.jsx`);
  } else {
    console.log(`No <main> tag found in ${name}.jsx`);
  }
});
