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
node --env-file=.env index.js
```

Output:

```
Toronto is the capital city of the province of Ontario in Canada. It is the largest city in Canada and is known for its diverse population, thriving arts and culture scene, and high standard of living. Toronto is a major financial and business hub, as well as a popular tourist destination.
```