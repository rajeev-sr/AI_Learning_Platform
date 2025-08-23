export async function getHint(questionId, code) {
  const res = await fetch('/api/hint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, code }),
  });
  return res.json();
}