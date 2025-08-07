import React from 'react';

import { createTheme } from '@uiw/codemirror-themes';
import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { tags as t } from '@lezer/highlight';

const myTheme = createTheme({
    theme: 'light',
    settings: {
      background: '#ffffff',
      foreground: '#75baff',
      caret: '#5d00ff',
      selection: '#036dd626',
      selectionMatch: '#036dd626',
      lineHighlight: '#8a91991a',
    //   gutterBackground: '#fff',
    //   gutterForeground: '#8a919966',
      lineNumbers: false,
      foldGutter: false,
    },
    // styles: [],
    styles: [
      { tag: t.comment, color: '#787b8099' },
      { tag: t.variableName, color: '#0080ff' },
      { tag: [t.string, t.special(t.brace)], color: '#5c6166' },
      { tag: t.number, color: '#5c6166' },
      { tag: t.bool, color: '#5c6166' },
      { tag: t.null, color: '#5c6166' },
      { tag: t.keyword, color: '#5c6166' },
      { tag: t.operator, color: '#5c6166' },
      { tag: t.className, color: '#5c6166' },
      { tag: t.definition(t.typeName), color: '#5c6166' },
      { tag: t.typeName, color: '#5c6166' },
      { tag: t.angleBracket, color: '#5c6166' },
      { tag: t.tagName, color: '#5c6166' },
      { tag: t.attributeName, color: '#5c6166' },
    ],
  });


function CodeEditor(props) {
    const onChange = React.useCallback((value, viewUpdate) => {
      console.log('value:', value);
    }, []);
    return (
      <CodeMirror
        value="Loading..."
        // height="200px"
        extensions={[python()]}
        onChange={onChange}
        // theme={myTheme}
        {...props}
        lineNumbers={false}
        basicSetup={{
        ...{
        lineNumbers: false,
        foldGutter: false,
        },
        ...props.basicSetup
    }}
      />
    );
  }
  export default CodeEditor;