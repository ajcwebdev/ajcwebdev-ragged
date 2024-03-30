import { Ragged } from "ragged"

const { OPENAI_API_KEY } = process.env

const raggedClient = new Ragged({
  openai: { apiKey: OPENAI_API_KEY }
})

raggedClient
  .qPredict("What is Toronto?")
  .then(console.log)
  .catch(console.error)