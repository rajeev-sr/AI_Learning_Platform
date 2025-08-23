export default function ResultPanel({ result }) {
  if (!result) return null;
  return (
    <div className="mt-4 p-2 bg-gray-100 rounded">
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}