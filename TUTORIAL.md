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

Install the `express` and `cors` dependencies:

```bash
npm i express cors
echo > server.js
```

Include the following code in `server.js`:

```js
// server.js

import express from 'express'
import bodyParser from 'body-parser'
import { Ragged } from 'ragged'
import cors from 'cors'

// Ensure you have your OPENAI_API_KEY in your .env or environment variables
const { OPENAI_API_KEY } = process.env

const raggedClient = new Ragged({
  openai: { apiKey: OPENAI_API_KEY }
})

const app = express()
const port = 3001

app.use(cors())

app.use(bodyParser.json())

// Define a POST endpoint
app.post('/predict', (req, res) => {
  // Extract the question from the request body
  const { question } = req.body

  // Use raggedClient to get prediction
  raggedClient.qPredict(question)
    .then(response => {
      // Send the response back to the client
      res.json({ answer: response })
    })
    .catch(error => {
      console.error("Error fetching prediction:", error)
      res.status(500).json({ error: 'An error occurred while fetching the prediction.' })
    })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
```

Start Express server:

```bash
node --env-file=.env server.js
```

Send `curl` command:

```bash
curl -X POST http://localhost:3001/predict \
  -H "Content-Type: application/json" \
  -d '{"question":"What is Toronto?"}'
```

## Add React Frontend

```bash
npm create vite@latest client -- --template react
cd client
rm -rf src/App.css
npm i
```

```jsx
// client/src/App.jsx

import { useState } from 'react'

export function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setAnswer(data.answer)
    } catch (error) {
      console.error("Failed to fetch answer:", error)
      setAnswer("Error fetching answer. Please check the console for more details.")
    }
  }
  
  return (
    <>
      <h1>Ragged Example</h1>
      <h2>with React and Express</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question"
          />
          <button type="submit">Submit</button>
        </form>
        {answer && <p>Answer: {answer}</p>}
      </div>
    </>
  )
}
```