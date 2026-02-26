const fs = require('fs');
const path = require('path');

const agentsPath = path.join(__dirname, 'agents.MD');
const content = fs.readFileSync(agentsPath, 'utf8');

const blocks = content.split(/^---\r?\n/m);

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Ensure global premium styles
const premiumCSS = `
<link rel="stylesheet" href="/styles.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
`;

for (let i = 0; i < blocks.length; i++) {
  const block = blocks[i].trim();
  if (block.startsWith('path:')) {
    let pathVal = '';
    let titleVal = '';
    block.split('\n').forEach(line => {
      if (line.startsWith('path:')) pathVal = line.replace('path:', '').trim();
      if (line.startsWith('title:')) titleVal = line.replace('title:', '').trim();
    });

    let k = i + 1;
    let contentParts = [];
    while (k < blocks.length && !blocks[k].trim().startsWith('path:')) {
      contentParts.push(blocks[k]);
      k++;
    }
    let htmlContent = contentParts.join('\n---\n');

    if (pathVal) {
      let fileName = pathVal === '/' ? 'index.html' : pathVal.startsWith('/') ? pathVal.slice(1) : pathVal;

      // For markdown to HTML replacement: replace inline styles logic
      htmlContent = htmlContent.replace(/<style>[\s\S]*?<\/style>/, ''); // Remove embedded styles to apply premium CSS
      if (fileName === 'null') {
        fileName = 'null.html';
        // keep void style for null
        htmlContent = htmlContent + `
<style>
  body { margin:0; background:#000; color:#0b0b0b; min-height: 100vh; display:flex; align-items:center; justify-content:center; }
  .void { height:100vh; display:flex; align-items:center; justify-content:center; padding: 0 16px; width: 100%; }
  .sel { color: #050505; user-select: text; font-family: "Outfit", sans-serif; font-size: 1.2rem; transition: color 0.3s; }
  ::selection { background: rgba(255,255,255,.16); color:#e9e9e9; }
</style>`;
      } else if (fileName === 'manifesto.txt') {
        // Just plain text
      } else {
        if (!fileName.endsWith('.txt')) {
          fileName = fileName.endsWith('.html') ? fileName : fileName + '.html';

          let customExtras = '';
          if (fileName === 'esrever.html') {
            customExtras = '<style>.ghost { opacity:.08; margin: 26vh auto 0; max-width: 520px; padding: 0 16px; text-align: center; font-size: 1.1rem; letter-spacing: 1px; }</style>';
          } else if (fileName === 'frequencia.html') {
            customExtras = '<style>.static { display:block; max-width: 780px; width: calc(100% - 32px); margin: 10vh auto 22px; border-radius: 18px; opacity:.9; box-shadow: 0 10px 30px rgba(0,0,0,0.8); transition: filter 0.5s; }.static:hover { filter: contrast(1.2) brightness(1.2); } .footer { margin-top: 18px; text-align:center; opacity:.07; font-size: 0.8rem; letter-spacing: 2px; } .gate{ margin-top: 2rem; }</style>';
          } else if (fileName === 'final.html') {
            customExtras = '<style>.footer { margin-top: 32px; text-align:center; opacity:.15; font-size: 0.8rem; letter-spacing: 2px; }</style>';
          } else if (fileName === 'ranking.html') {
            customExtras = `
<style>
  .wrap { max-width: 980px; width: 100%; margin: 8vh auto 0; padding: 0 16px; }
  .card { border: 1px solid var(--border); border-radius: 20px; padding: 32px; background: rgba(20,20,20,0.4); backdrop-filter: blur(16px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
  .sub { opacity: 0.6; margin-top: -12px; margin-bottom: 24px; font-size: 0.9rem; }
  .tbl { width:100%; border-collapse: separate; border-spacing: 0; margin-top: 20px; font-size: 0.95rem; }
  .tbl th, .tbl td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,.04); text-align: left; transition: background 0.2s; }
  .tbl tbody tr:hover td { background: rgba(255,255,255,0.02); }
  .tbl th { color: #888; font-weight: 400; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; }
  .actions { display:flex; gap:16px; margin-top: 32px; flex-wrap: wrap; }
  .actions button { padding: 12px 24px; width: auto; font-size: 0.85rem; letter-spacing: 1px; }
  .danger { color: #ff6b6b; border-color: rgba(255,107,107,0.2); background: rgba(255,107,107,0.05); }
  .danger:hover { background: rgba(255,107,107,0.15); border-color: rgba(255,107,107,0.4); box-shadow: 0 0 15px rgba(255,107,107,0.2); }
  .foot { margin-top: 24px; opacity: 0.15; text-align:right; font-size: 0.8rem; letter-spacing: 2px; }
</style>`;
          }

          // Parse markdown headings and quotes into HTML wrappers as needed for styling
          htmlContent = htmlContent.replace(/#\s*/g, '');
          htmlContent = htmlContent.replace(/> (.*?)(?=\n|$)/g, '<blockquote>$1</blockquote>');
          htmlContent = htmlContent.replace(/<blockquote>(.*?)<\/blockquote>\s*<blockquote>(.*?)<\/blockquote>/g, '<blockquote>$1<br>$2</blockquote>');
          htmlContent = htmlContent.replace(/<blockquote>(.*?)<\/blockquote>\s*<blockquote>(.*?)<\/blockquote>/g, '<blockquote>$1<br>$2</blockquote>');

          // Update NEXT locations in JS manually to point to no extensions or handled strictly
          // For static hosting without extension, we can leave NEXT paths as is if using an Express server!
          // The express server will map /0 to /0.html 

          // Extract known clues before stripping comments globally
          let originalClue = '';
          if (htmlContent.includes('<!-- frequencia: zero -->')) originalClue = '\n<!-- frequencia: zero -->';
          if (htmlContent.includes('<!-- acesso concedido -->')) originalClue = '\n<!-- acesso concedido -->';
          if (htmlContent.includes('<!-- observe o que observa -->')) originalClue = '\n<!-- observe o que observa -->';

          // Remove HTML comments globally to prevent leaking answers and hints in the source code
          htmlContent = htmlContent.replace(/<!--[\s\S]*?-->/g, '');

          let finalContent = htmlContent;
          if (fileName === 'index.html') {
            const svgPath = '/eidilon.svg'; // Public path to the logo
            finalContent = `<img src="${svgPath}" alt="Eidolon Logo" style="max-width: 150px; margin-bottom: 2rem; opacity: 0.8;">\n` + finalContent;
          }

          htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleVal || 'Protocolo Eidolon'}</title>
  ${premiumCSS}
  ${customExtras}
</head>
<body>
<div style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
  ${finalContent}
</div>${originalClue}
</body>
</html>`;
        }
      }

      fs.writeFileSync(path.join(publicDir, fileName), htmlContent);
    }
  }
}

console.log('Pages generated successfully!');
