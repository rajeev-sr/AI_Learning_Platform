import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

export default function MonacoIDE({ starterCode, onRun }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = monaco.editor.create(document.getElementById('monaco'), {
        value: starterCode,
        language: 'python',
        theme: 'vs-dark',
      });
    }
  }, [starterCode]);

  return <div id="monaco" style={{ height: 300 }} />;
}