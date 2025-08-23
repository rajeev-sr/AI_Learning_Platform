export async function submitCode(questionId, code) {
  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, code }),
  });
  return res.json();
}