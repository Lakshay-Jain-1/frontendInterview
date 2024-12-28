import { useEffect } from "react";
import CodeEditor from "../components/Editor";
import Question from "../components/Question";
import TestCases from "../components/TestCases";
import "./TechnicalRound.css";
import { gettingAquestion } from "../../../controller/api-technicalRound";
import { useDispatch,useSelector } from "react-redux";
import { add } from "../../../store/slices/technicalRoundSlice";
import { RootState } from "../../../store/store";
import Result from "../components/Result";


const TechnicalRound: React.FC = () => {
  const testCaseOutputValue:boolean= useSelector((state:RootState)=>state.technical.testCaseOutput)
  const dispatch = useDispatch()
    useEffect(()=>{
      questionGenerator()
    },[])

    async function questionGenerator() {
      const {id,question,testCase,difficulty,name} =await gettingAquestion(1)
  //    console.log("questiongen",{id,question,testCase,difficulty})
        dispatch(add({id,question,testCase,difficulty,name}))
    } 

  return (
    <>
     
      <div className="technicalRound">
      <Question />
      <TestCases />
      <CodeEditor />
      </div>
      
      {testCaseOutputValue?<Result/>:""}
    </>
  );
};

export default TechnicalRound;
