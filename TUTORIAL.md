```bash
mkdir ajcwebdev-ragged
cd ajcwebdev-ragged
```

Initialize `package.json` and install dependencies:

```bash
npm init -y
npm install --save openai rxjs ragged dotenv
```

Make sure to set `type` to `module` in `package.json`.

```bash
echo '# Ragged' > README.md
echo 'node_modules\n.DS_Store\n.env' > .gitignore
```

Create `index.js` file:

```bash
echo > index.js
```

```js
// index.js

import { Ragged } from "ragged"

const { OPENAI_API_KEY } = process.env

const raggedClient = new Ragged({
  openai: { apiKey: OPENAI_API_KEY }
})

raggedClient
  .qPredict("What is Toronto?")
  .then(console.log)
  .catch(console.error)
```

Run `index.js` file with `--env-file` flag.

```bash
node --env-file=.env index.js
```

Output:

```
Toronto is the capital city of the province of Ontario in Canada. It is the largest city in Canada and is known for its diverse population, thriving arts and culture scene, and high standard of living. Toronto is a major financial and business hub, as well as a popular tourist destination.
```