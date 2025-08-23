export default function CategorySelector({ onSelect }) {
  const categories = ['AI', 'ML', 'DL', 'GenAI'];
  return (
    <div className="flex gap-4">
      {categories.map(cat => (
        <button key={cat} className="btn" onClick={() => onSelect(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}