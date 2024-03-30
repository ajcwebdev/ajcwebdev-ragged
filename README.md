```bash
mkdir ajcwebdev-ragged
cd ajcwebdev-ragged
npm init -y
npm install --save openai rxjs ragged dotenv
echo '# Ragged' > README.md
echo 'node_modules\n.DS_Store\n.env' > .gitignore
echo > index.js
```

Set `type` to `module` in `package.json`.

```bash
node index.js
```

## Error

```
node:internal/modules/esm/resolve:265
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/ajc/ajcwebdev-ragged/node_modules/ragged/build/ragged.module.min.js' imported from /Users/ajc/ajcwebdev-ragged/index.js
    at finalizeResolution (node:internal/modules/esm/resolve:265:11)
    at moduleResolve (node:internal/modules/esm/resolve:933:10)
    at defaultResolve (node:internal/modules/esm/resolve:1157:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:390:12)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:359:25)
    at ModuleLoader.getModuleJob (node:internal/modules/esm/loader:234:38)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:87:39)
    at link (node:internal/modules/esm/module_job:86:36) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///Users/ajc/ajcwebdev-ragged/node_modules/ragged/build/ragged.module.min.js'
}

Node.js v20.12.0
```