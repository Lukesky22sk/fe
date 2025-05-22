const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function fetchInitialQuestion() {
  const response = await fetch(`${API_BASE_URL}/api/questions`);
  if (!response.ok) throw new Error('Failed to fetch questions');
  return await response.json(); // expecting: { question, guidance }
}

export async function submitAnswer(answer) {
  const response = await fetch(`${API_BASE_URL}/api/answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer }),
  });

  if (!response.ok) throw new Error('Failed to submit answer');
  return await response.json(); // expecting: { nextQuestion, guidance }
}
