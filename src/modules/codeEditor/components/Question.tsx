import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

function Question() {
  const {name,question,id}: any = useSelector(
    (state: RootState) => state.technical
  );
 

  return (
    <>
      <div className="question">
         <h2 style={{marginBottom:"20px"}}>{id}.{name}</h2>
         <h4> {question.split("\n").map((line, index) => (
          <div key={index}>{line.trim() === "" ? <br /> : line}</div>
        ))}</h4>
        
        </div>
    </>
  );
}

export default Question;
