const ts = require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript');
const fs = require('fs');
for (const f of ['src/App.tsx','src/main.tsx']) {
  const src = fs.readFileSync(f,'utf8');
  const out = ts.transpileModule(src, {compilerOptions:{target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020, jsx: ts.JsxEmit.React, esModuleInterop:true}});
  const outPath = f.replace(/^src/,'static/src').replace(/\.tsx$/,'.js');
  fs.mkdirSync(require('path').dirname(outPath), {recursive:true});
  fs.writeFileSync(outPath, out.outputText);
  if (out.diagnostics?.length) console.log(out.diagnostics.map(d=>d.messageText).join('\n'));
}
