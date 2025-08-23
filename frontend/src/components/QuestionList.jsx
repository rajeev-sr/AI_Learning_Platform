export default function QuestionList({ questions, onSelect }) {
  return (
    <ul>
      {questions.map(q => (
        <li key={q.id}>
          <button onClick={() => onSelect(q.id)}>{q.title}</button>
        </li>
      ))}
    </ul>
  );
}