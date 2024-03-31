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

## Add Express Server

```bash
npm i express
echo > server.js
```

```js
// server.js

import express from 'express'
import bodyParser from 'body-parser'
import { Ragged } from 'ragged'

// Ensure you have your OPENAI_API_KEY in your .env or environment variables
const { OPENAI_API_KEY } = process.env

const raggedClient = new Ragged({
  openai: { apiKey: OPENAI_API_KEY }
})

// Initialize Express
const app = express()
const port = 3001

// Use body-parser to parse JSON bodies
app.use(bodyParser.json())

// Define a POST endpoint
app.post('/predict', (req, res) => {
  // Extract the question from the request body
  const { question } = req.body

  // Use your raggedClient to get the prediction
  raggedClient.qPredict(question)
    .then(response => {
      // Send the response back to the client
      res.json(response)
    })
    .catch(error => {
      console.error(error)
      res.status(500).send('An error occurred while fetching the prediction.')
    })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
```

```bash
node --env-file=.env server.js
```

```bash
curl -X POST http://localhost:3001/predict \
  -H "Content-Type: application/json" \
  -d '{"question":"What is Toronto?"}'
```