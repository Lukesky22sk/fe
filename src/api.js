const API_URL = process.env.REACT_APP_API_BASE_URL;

export async function fetchInitialQuestion() {
  const res = await fetch(`${API_URL}/api/initial-question`);
  if (!res.ok) throw new Error("Failed to fetch initial question");
  return res.json();
}

export async function submitAnswer(answer) {
  const res = await fetch(`${API_URL}/api/submit-answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer }),
  });
  if (!res.ok) throw new Error("Failed to submit answer");
  return res.json();
}
