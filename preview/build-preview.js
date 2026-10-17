const fs=require('fs');let ts;try{ts=require('typescript')}catch{ts=require('/usr/local/slides_js/node_modules/typescript')}const vm=require('vm');
const src=fs.readFileSync('src/lib/site-data.ts','utf8');const code=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const sandbox={exports:{}};vm.runInNewContext(code,sandbox);const {packages,universe,tiers}=sandbox.exports;
fs.writeFileSync('preview/data.js','window.WANDER_DATA='+JSON.stringify({packages,universe,tiers})+';');
let css=fs.readFileSync('src/app/globals.css','utf8').replace("@import 'tailwindcss';",'');
for(const file of ['recognition-night.webp']){const uri='data:image/webp;base64,'+fs.readFileSync('public/media/mice/'+file).toString('base64');css=css.replaceAll('/media/mice/'+file,uri);}
fs.writeFileSync('preview/style.css',css);

// Build a truly standalone, private preview, including both approved logo variants.
const pth=require('path');
let html=fs.readFileSync('preview/index.html','utf8');
html=html.replace('<link rel="stylesheet" href="./style.css">',`<style>${fs.readFileSync('preview/style.css','utf8')}</style>`);
html=html.replace('<script src="./data.js"></script>',`<script>${fs.readFileSync('preview/data.js','utf8')}</script>`);
for(const [name,file] of [['wander-header.webp','public/brand/wander-header.webp'],['wander-logo.webp','public/brand/wander-logo.webp']]){
 const uri='data:image/webp;base64,'+fs.readFileSync(file).toString('base64');
 html=html.replaceAll('../public/brand/'+name,uri);
}
const localMedia={};
for(const file of fs.readdirSync('public/media/corporate').filter(x=>x.endsWith('.webp'))){
  const uri='data:image/webp;base64,'+fs.readFileSync('public/media/corporate/'+file).toString('base64');
  html=html.replaceAll('../public/media/corporate/'+file,uri);
  localMedia[file]=uri;
}
html=html.replace('<script>window.WANDER_DATA=', '<script>window.WANDER_MEDIA='+JSON.stringify(localMedia)+';</script><script>window.WANDER_DATA=');

const miceFiles=fs.readdirSync('public/media/mice').filter(x=>x.endsWith('.webp'));
const miceMedia={};
for(const file of miceFiles){miceMedia[file]='data:image/webp;base64,'+fs.readFileSync('public/media/mice/'+file).toString('base64');}
html=html.replace('<script>window.WANDER_DATA=', '<script>window.WANDER_MICE_MEDIA='+JSON.stringify(miceMedia)+';</script><script>window.WANDER_DATA=');


const avantagesMedia={};
for(const file of fs.readdirSync('public/media/avantages').filter(x=>x.endsWith('.webp'))){
 avantagesMedia[file]='data:image/webp;base64,'+fs.readFileSync('public/media/avantages/'+file).toString('base64');
}
html=html.replace('<script>window.WANDER_DATA=', '<script>window.WANDER_AVANTAGES_MEDIA='+JSON.stringify(avantagesMedia)+';</script><script>window.WANDER_DATA=');
const kidsMedia={};
for(const file of fs.readdirSync('public/media/kids').filter(x=>x.endsWith('.webp'))){kidsMedia[file]='data:image/webp;base64,'+fs.readFileSync('public/media/kids/'+file).toString('base64');}
html=html.replace('<script>window.WANDER_DATA=', '<script>window.WANDER_KIDS_MEDIA='+JSON.stringify(kidsMedia)+';</script><script>window.WANDER_DATA=');
const scolaireMedia={};
for(const file of fs.readdirSync('public/media/scolaire').filter(x=>x.endsWith('.webp'))){scolaireMedia[file]='data:image/webp;base64,'+fs.readFileSync('public/media/scolaire/'+file).toString('base64');}
html=html.replace('<script>window.WANDER_DATA=', '<script>window.WANDER_SCOLAIRE_MEDIA='+JSON.stringify(scolaireMedia)+';</script><script>window.WANDER_DATA=');
const triangleMedia={};
for(const file of fs.readdirSync('public/media/triangle-dor').filter(x=>x.endsWith('.webp'))){triangleMedia[file]='data:image/webp;base64,'+fs.readFileSync('public/media/triangle-dor/'+file).toString('base64');}
html=html.replace('<script>window.WANDER_DATA=', '<script>window.WANDER_TRIANGLE_MEDIA='+JSON.stringify(triangleMedia)+';</script><script>window.WANDER_DATA=');
fs.writeFileSync('/mnt/data/WANDER_PREVISUALISATION_FINALE.html',html);
fs.writeFileSync('preview/WANDER_PREVISUALISATION_FINALE.html',html);


