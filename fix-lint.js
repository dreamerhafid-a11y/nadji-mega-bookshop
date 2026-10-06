const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace letter'letter with letter&apos;letter
  content = content.replace(/([a-zA-Z])'([a-zA-Z])/g, "$1&apos;$2");
  // Some might be preceded by spaces but followed by letter, like " 'c" - let's just do letter'letter
  fs.writeFileSync(filePath, content, 'utf8');
}

const files = [
  "src/app/commande/confirmation/page.tsx",
  "src/app/compte/adresses/page.tsx",
  "src/app/compte/commandes/page.tsx",
  "src/app/compte/layout.tsx",
  "src/app/compte/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/faq/page.tsx",
  "src/app/mentions-legales/page.tsx",
  "src/app/panier/CartClient.tsx",
  "src/app/politique-de-retour/page.tsx",
  "src/app/a-propos/page.tsx"
];

files.forEach(f => {
  const p = path.join(__dirname, f);
  if (fs.existsSync(p)) {
    processFile(p);
  }
});
