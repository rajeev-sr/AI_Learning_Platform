import MonacoIDE from './MonacoIDE';
import ResultPanel from './ResultPanel';

export default function QuestionWorkspace({ question, onRun, onHint, onOptimized, result }) {
  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        {/* examples, constraints*/}
      </div>
      <div className="w-1/2 p-4">
        <MonacoIDE starterCode={question.starter_code} onRun={onRun} />
        <div className="flex gap-2 mt-2">
          <button onClick={onRun} className="btn">Run</button>
          <button onClick={onHint} className="btn">Get Hint</button>
          <button onClick={onOptimized} className="btn">Optimized Solution</button>
        </div>
        <ResultPanel result={result} />
      </div>
    </div>
  );
}