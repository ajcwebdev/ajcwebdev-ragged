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