import React, { useRef } from "react";
import Editor from "@monaco-editor/react";



const CodeEditor:React.FC =()=>{
    const editorRef = useRef(null);

    function handleEditorWillMount(monaco) {
      // here is the monaco instance
      // do something before editor is mounted
      console.log("before");
      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    }
  
    function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;
    }
    function handleEditorValidation(markers) {
      // model markers
      markers.forEach((marker) => console.log("onValidate:", marker.message));
    }
  
    function showValue() {
      alert(editorRef.current.getValue());
    }
   
  
    return (
      <>
     
        <div className="editor">
        <Editor
          //theme="vs-dark"
          height="90vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          onValidate={handleEditorValidation}
        />
        </div>
      </>
    );
}

export default CodeEditor