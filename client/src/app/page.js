'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Failed to fetch answer:', error);
      setAnswer('Error fetching answer. Please check the console for more details.');
    }
  };

  return (
    <main className={styles.main}>
      <h1>Ragged Example</h1>
      <h2>with Next.js and API Routes</h2>
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
    </main>
  );
}