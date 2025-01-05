import { useEffect, useState } from "react";
import CreateACall from "@mui/icons-material/Call";
import JoinACall from "@mui/icons-material/PhoneCallback";
import Creating from "../components/User1";
import Joining from "../components/User2";
import "./Interview.css"
import "./Interview2.css"
import { callCut, setAUserOffline, setAUserOnline } from "../../../controller/api-activeUsers";
import OnlineUsers from "../components/OnlineUsers";
function VideoChat() {
  const [create, setCreate] = useState<boolean | null>(true);
  const [createOffer, setCreateOffer] = useState<boolean | null>(false);
  const [createAnswer, setCreateAnswer] = useState<boolean | null>(false);
  useEffect(() => {
    setAUserOnline("Alice", 1);
    setAUserOnline("Eve", 5);
    getLocalStream();
    // when closing a tab it will initiate this function
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      setAUserOffline("Alice")
      setAUserOffline("Eve")
    
    }; 

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  function getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        window.localStream  = stream;
        window.localAudio.srcObject = stream;
        window.localAudio.autoplay = true;
      })
      .catch((err) => {
        console.error(`you got an error: ${err}`);
      });
  }
  
  async function cuttingCall(){
     await callCut("Alice")
  }


  return (
    <>
      <div style={{display:create?"flex":"none"}} className="logocontainer" >
         <div>
         <CreateACall className="logos"  onClick={()=>{setCreate(false); setCreateOffer(true);}}/>
         <h3> Create a call</h3> 
         </div>

         <div>
         <JoinACall className="logos" onClick={()=>{setCreate(false); setCreateAnswer(true);}}/>
     
        <h3> Join a call</h3> 
         </div>
 
       
      </div>
      
      {createOffer?<div className="creatingContainer">
      <Creating/>
      <OnlineUsers/>
      <button className="callCut" onClick={cuttingCall}>Cut Call</button>
      </div>:""}

      {createAnswer?<div className="joiningContainer">
      <Joining/>
      {/* <OnlineUsers/> */}
      <button className="callCut" onClick={cuttingCall}>Call Cut</button>
      </div>:""}

   

    
    </>
  );
}
export default VideoChat;
