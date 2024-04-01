import { Ragged } from 'ragged';

export async function POST(request) {
  const { OPENAI_API_KEY } = process.env;
  console.log('OPENAI_API_KEY:', OPENAI_API_KEY); // Add this line

  const raggedClient = new Ragged({ openai: { apiKey: OPENAI_API_KEY } });

  try {
    const { question } = await request.json();
    console.log('Question:', question); // Add this line
    const response = await raggedClient.qPredict(question);
    console.log('Response:', response); // Add this line
    return new Response(JSON.stringify({ answer: response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching prediction:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while fetching the prediction.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}