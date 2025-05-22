import { useState, useEffect } from "react";
import { fetchInitialQuestion, submitAnswer } from "./api";

export default function App() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [guidance, setGuidance] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchInitialQuestion()
      .then((data) => {
        setQuestion(data.question);
        setGuidance(data.guidance || "");
        setLoading(false);
      })
      .catch(() => {
        setQuestion("Failed to load question. Please refresh.");
        setLoading(false);
      });
  }, []);

  async function handleNext() {
    if (!answer.trim()) return;
    setLoading(true);
    try {
      const response = await submitAnswer(answer);
      setHistory((h) => [...h, { question, answer }]);
      setQuestion(response.nextQuestion || "End of questions.");
      setGuidance(response.guidance || "");
      setAnswer("");
    } catch {
      setGuidance("Failed to submit answer. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setQuestion(prev.question);
    setAnswer(prev.answer);
    setGuidance("");
    setHistory((h) => h.slice(0, h.length - 1));
  }

  return (
    <div className="app">
      <header className="app-header">MichelleKinzai Guided UI</header>
      <main className="question-area">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="question">{question}</div>
            <textarea
              className="answer-input"
              rows={3}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
            />
            {guidance && <div className="guidance">{guidance}</div>}
            <div className="buttons">
              <button onClick={handleBack} disabled={history.length === 0}>
                Back
              </button>
              <button onClick={handleNext} disabled={!answer.trim() || loading}>
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
