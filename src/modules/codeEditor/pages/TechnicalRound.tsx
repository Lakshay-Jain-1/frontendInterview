import CodeEditor from "../components/Editor";
import Question from "../components/Question";
import TestCases from "../components/TestCases";
import "./TechnicalRound.css";

const TechnicalRound: React.FC = () => {
  return (
    <>
      <button id="run"> Run</button>
      <div className="technicalRound"  >
      <Question />
      <TestCases />
      <CodeEditor />
      </div>
     
    </>
  );
};

export default TechnicalRound;
