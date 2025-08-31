/**
 * Simple syntax highlighter for code showcase
 * Tokenizes code into categories for syntax highlighting
 */

export const tokenizeCode = (code) => {
  const tokens = [];
  const keywords = new Set([
    'import', 'from', 'def', 'class', 'return', 'if', 'else', 'elif', 
    'for', 'while', 'try', 'except', 'with', 'as', 'in', 'not', 'and', 
    'or', 'True', 'False', 'None', 'async', 'await', 'function', 'const', 
    'let', 'var', 'export', 'default', 'public', 'private', 'static'
  ]);

  // Simple tokenizer - splits by word boundaries and categorizes
  const parts = code.split(/(\s+|[{}()[\];,."'`])/);
  
  parts.forEach((part, index) => {
    if (!part.trim()) {
      tokens.push({ type: 'whitespace', value: part });
      return;
    }

    // Comments
    if (part.startsWith('//') || part.startsWith('#')) {
      tokens.push({ type: 'comment', value: part });
    }
    // Strings
    else if ((part.startsWith('"') && part.endsWith('"')) || 
             (part.startsWith("'") && part.endsWith("'"))) {
      tokens.push({ type: 'string', value: part });
    }
    // Numbers
    else if (/^\d+(\.\d+)?$/.test(part)) {
      tokens.push({ type: 'number', value: part });
    }
    // Keywords
    else if (keywords.has(part)) {
      tokens.push({ type: 'keyword', value: part });
    }
    // Operators and punctuation
    else if (/^[{}()[\];,."'`]$/.test(part)) {
      tokens.push({ type: 'punctuation', value: part });
    }
    // Default text
    else {
      tokens.push({ type: 'text', value: part });
    }
  });

  return tokens;
};

export const getTokenClassName = (type) => {
  const classes = {
    keyword: 'text-blue-400 font-medium',
    string: 'text-green-400',
    comment: 'text-gray-500 italic',
    number: 'text-orange-400',
    punctuation: 'text-gray-300',
    text: 'text-gray-100',
    whitespace: ''
  };
  
  return classes[type] || 'text-gray-100';
};
