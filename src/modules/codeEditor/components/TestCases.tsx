import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
function TestCases() {
  const testcaseText: string = useSelector(
    (state: RootState) => state.technical.testCase
  );
  return (
    <>
      <div className="testCase">
        <h2 style={{ marginBottom: "20px" }}>Test Cases</h2>
        <h4> {testcaseText.split("\n").map((line, index) => (
          <div key={index}>{line.trim() === "" ? <br /> : line}</div>
        ))}</h4>
      </div>
    </>
  );
}

export default TestCases;
