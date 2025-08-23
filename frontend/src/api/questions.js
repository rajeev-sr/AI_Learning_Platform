export async function fetchQuestions(category) {
  const res = await fetch(`/api/questions?category=${category}`);
  return res.json();
}
export async function fetchQuestion(id) {
  const res = await fetch(`/api/questions/${id}`);
  return res.json();
}