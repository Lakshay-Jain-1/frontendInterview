import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  gettingAquestion,
  submitAquestion,
} from "../../../controller/api-technicalRound";
import Timer from "./Timer";
import { minify } from "terser";
import { useDispatch } from "react-redux";
import { result } from "../../../store/slices/technicalRoundSlice";
const CodeEditor: React.FC = () => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const driverCode = `function main() {
    let a = new Solution();
    let testCases = [[2, 7, 11, 15], [3, 2, 4], [3, 3]];
    let targets = [9, 6, 6];
    let preResult = [[0, 1], [1, 2], [0, 1]];

    testCases.forEach((ele, index) => {
        const result = a.twosum(ele, targets[index]);
        if (JSON.stringify(preResult[index]) !== JSON.stringify(result)) {
            console.log("Test case failed");
            return false;
        }
    });
    console.log("All test cases passed");
    return true;
}
main()
      `;

  const handleRun = async () => {
    const fullCode = editorRef.current.getValue() + "\n" + driverCode;

    try {
      const minifiedCode = await minify(fullCode);
      const encodedCode = btoa(minifiedCode.code);
      const submission = await submitAquestion(encodedCode, 97);
      let data: string = atob(submission.stdout);
      dispatch(result(data));
    } catch (err) {
      console.error("Error while minifying the code:", err);
    }
  };

  async function handleEditorWillMount(monaco) {
    await gettingAquestion(1);
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  return (
    <>
      <button onClick={handleRun} id="run">
        Run
      </button>

      <div className="editor">
        <Timer />
        <Editor
          theme="vs-dark"
          height="105%"
          width="100%"
          defaultLanguage="javascript"
          beforeMount={handleEditorWillMount}
          onMount={(editor, monaco) => {
            editorRef.current = editor;
          }}
          options={{
            wordWrap: "on", // Enables word wrapping
            wordWrapBreakAfterCharacters: ",;.", // Breaks lines after these characters
            wrappingIndent: "indent", // Indents wrapped lines
            minimap: { enabled: false }, // Optional: disable the minimap
          }}
        />
      </div>
    </>
  );
};

export default CodeEditor;
