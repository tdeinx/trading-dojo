import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
let scripts=0,links=0;const errors=[];
const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
for(const file of pages){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 for(const [index,tag] of [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].entries()){
  if(!tag[1].includes('src=')){try{new vm.Script(tag[2],{filename:`${file}:script-${index}`});scripts++;}catch(e){errors.push(e.message);}}
 }
 for(const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)){
  const url=match[1];if(/^(https?:|mailto:|data:|#|\$)/.test(url)||url.includes('${'))continue;
  const target=url.split(/[?#]/)[0];if(!target)continue;links++;
  if(!fs.existsSync(path.join(root,target.replace(/^\//,''))))errors.push(`${file}: missing ${target}`);
 }
 for(const marker of ['name="description"','property="og:title"','property="og:description"','property="og:image"','property="og:url"','property="og:image:width"','property="og:image:height"','property="og:image:alt"','name="twitter:card"','name="twitter:title"','name="twitter:description"','name="twitter:image"','name="twitter:image:alt"','name="viewport"'])if(!html.includes(marker))errors.push(`${file}: missing ${marker}`);
}
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.js'))){new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});scripts++;}
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'academy-data.js'),'utf8'),ctx);
assert.equal(ctx.window.ACADEMY_MODULES.length,7);assert.equal(ctx.window.ACADEMY_MODULES.reduce((n,m)=>n+m.lessons.length,0),22);
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
for(const icon of manifest.icons)assert.ok(fs.existsSync(path.join(root,icon.src)),`Missing install icon ${icon.src}`);
for(const f of ['favicon.ico','favicon.png','favicon-32.png','apple-touch-icon.png','og-image.png'])assert.ok(fs.existsSync(path.join(root,f)),`Missing house asset ${f}`);
assert.equal(manifest.start_url,'/dashboard.html');
const shareImage=fs.readFileSync(path.join(root,'og-image.png'));assert.equal(shareImage.readUInt32BE(16),1200);assert.equal(shareImage.readUInt32BE(20),630);
for(const t of ['tracks.test.mjs','learning-path.test.mjs','risk-engine.test.mjs','quote.test.mjs','history.test.mjs','options-engine.test.mjs'])execFileSync(process.execPath,[path.join(root,'scripts',t)],{stdio:'inherit'});
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`PASS: ${pages.length} pages, ${scripts} scripts parsed, ${links} local references, 7 modules / 22 core lessons, metadata and PWA icons.`);
