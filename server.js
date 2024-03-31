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