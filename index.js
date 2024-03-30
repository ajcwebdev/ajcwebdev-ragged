import { Ragged } from "ragged"

const { OPENAI_API_KEY } = process.env

// const OPENAI_API_KEY = "x54TUTzuc1dRNx0m8HxjT3BlbkFJfkU9oMGjWLZrjovoyI0A"

const r = new Ragged({
  openai: { apiKey: OPENAI_API_KEY }
})

r.qPredict("What is Toronto?")
  .then(console.log)
  .catch(console.error)
// Toronto is a city in Canada. It has a population of...