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