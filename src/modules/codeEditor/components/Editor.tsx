import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import {gettingAquestion,submitAquestion} from "../../../controller/api-technicalRound";
import Timer from "./Timer";
import { minify } from "terser";
import { useDispatch } from "react-redux";
import { result } from "../../../store/slices/technicalRoundSlice";

const CodeEditor: React.FC = () => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  // Custom Monaco theme definition
  const customTheme = {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6A9955" },
      { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
      { token: "string", foreground: "CE9178" },
      { token: "number", foreground: "B5CEA8" },
      { token: "function", foreground: "DCDCAA" },
      { token: "variable", foreground: "9CDCFE" },
      { token: "type", foreground: "4EC9B0" },
    ],
    colors: {
      "editor.background": "#1F2337",
      "editor.foreground": "#E5F9FF",
      "editor.lineHighlightBackground": "#2D3250",
      "editor.selectionBackground": "#404878",
      "editor.inactiveSelectionBackground": "#3A4266",
      "editorCursor.foreground": "#4CC2FF",
      "editorLineNumber.foreground": "#58608A",
      "editorLineNumber.activeForeground": "#4CC2FF",
      "editor.selectionHighlightBackground": "#2D3250",
      "editor.wordHighlightBackground": "#2D3250",
      "editorIndentGuide.background": "#2D3250",
      "scrollbarSlider.background": "#2D325066",
      "scrollbarSlider.hoverBackground": "#2D3250AA",
      "scrollbarSlider.activeBackground": "#4CC2FF66",
    },
  };

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
main()`;

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
  
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // Define and set theme after editor is mounted
    monaco.editor.defineTheme('customDarkTheme', customTheme);
    monaco.editor.setTheme('customDarkTheme');
  };
  return (
    <>
      <button onClick={handleRun} id="run">
        Run
      </button>

      <div className="editor">
        <Timer />
        <Editor
          height="95vh"
          width="99%"
          defaultLanguage="javascript"
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          options={{
            wordWrap: "on",
            wordWrapBreakAfterCharacters: ",;.",
            wrappingIndent: "indent",
            minimap: { enabled: false },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 14,
            lineHeight: 1.5,
            padding: { top: 10 },
            scrollBeyondLastLine: false,
            cursorBlinking: "smooth",
            smoothScrolling: true,
            renderLineHighlight: "all",
            bracketPairColorization: {
              enabled: true,
            },
            autoIndent: "full",
            formatOnPaste: true,
            formatOnType: true,
            glyphMargin: false,
            guides: {
              bracketPairs: true,
              indentation: true,
            },
          }}
        />
      </div>
    </>
  );
};

export default CodeEditor;
