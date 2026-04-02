import fs from 'fs';
import path from 'path';

const map = {
  '#0B192C': 'brand-bg',
  '#F4F1EB': 'brand-text',
  '#34D399': 'brand-primary',
  '#203A43': 'brand-secondary'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    let fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) { 
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  // Replace direct bracket notation: text-[#0B192C] -> text-brand-bg
  // and text-[#0B192C]/50 -> text-brand-bg/50
  for (const [hex, cssClass] of Object.entries(map)) {
    const rx = new RegExp(`\\[${hex}\\]`, 'gi');
    if (rx.test(content)) {
      content = content.replace(rx, cssClass);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content);
  }
});
console.log('Color Replacement Complete.');
