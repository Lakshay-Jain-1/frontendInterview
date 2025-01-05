import { useEffect } from "react"
import { accessOffer, sendAnswer } from "../../../controller/api-sharingSdp";
import { useDispatch, useSelector } from "react-redux";
import { setAcceptor, setOFFER } from "../../../store/slices/interviewRoud";
import { RootState } from "../../../store/store";

export default function User2() {
  const dispatch = useDispatch()
  const {acceptor,offer} = useSelector((state:RootState)=>state.interview)
    const configuration = {
        iceServers: [
          {
            urls: "stun:stun.relay.metered.ca:80"
          },
          {
            urls: [
              "turn:global.relay.metered.ca:80",
              "turn:global.relay.metered.ca:80?transport=tcp",
              "turn:global.relay.metered.ca:443",
              "turns:global.relay.metered.ca:443?transport=tcp"
            ],
            username: "0cd9ccb34e98b4f6c74f93ba",
            credential: "8fYmVjwNW0bjHZ51"
          }
        ]
      };
      let gettingOffer ;
      useEffect(()=>{
        console.log("asdlkasdlkds")
        gettingOffer =  setInterval(()=>{
          generateAnswer()
         },2000)
         return ()=> clearInterval(gettingOffer)
      },[])

   async function generateAnswer() {
     try {
      let data:any = await accessOffer("Eve")

      dispatch(setAcceptor({acceptor:data.acceptor}))
      dispatch(setOFFER({offer:data.offer,name:"Eve"}))
      // createAnswer(data.offer)
      
      clearInterval(gettingOffer)
     } catch (error) {
      console.log(error)
      clearInterval(gettingOffer)
     }
   }
      
    const createAnswer = async(userOffer:any) => {
        const offer = JSON.parse(userOffer)
        let videos :any = document.getElementById("viduser2");
        const rc:any = new RTCPeerConnection(configuration);
        const dc:any = rc.createDataChannel("channel1");
        const remoteVideo:HTMLVideoElement = document.querySelector('#remoteVideo');
        const localStream = await window.navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true, // Enable echo cancellation
              noiseSuppression: true, // Reduce background noise
              autoGainControl: true,  // Adjust microphone sensitivity automatically
            },
            video: true, // Set to false if video is not needed
          });
          // this below line ko what we will do is store and in interview page we will display it like picture in picture or interviewer ki kar sktee hainnnnn
          videos.srcObject = localStream;
        localStream.getTracks().forEach(track => {
          rc.addTrack(track, localStream);
        });

        rc.addEventListener('track', async (event) => {
            const [remoteStream] = event.streams;
             // this below line ko what we will do is store and in interview page we will display it like picture in picture or interviewer ki kar sktee hainnnnn
            remoteVideo.srcObject = remoteStream;
        });

        rc.onicecandidate = async(e) => {
            console.log("New Ice Candidate! Reprinting SDP: " + JSON.stringify(rc.localDescription))
            sendAnswer("Eve","Alice",JSON.stringify(rc.localDescription))
            await navigator.clipboard.writeText(JSON.stringify(rc.localDescription));
        }
         
        dc.onopen = () => console.log("Connection opened!");

        rc.ondatachannel = (e) => {
            rc.dc = e.channel;
            rc.dc.onmessage = (e) => console.log("new message from client: " + e.data);
            rc.dc.onopen = (e) => console.log("Connection opened!");

        };

        rc.setRemoteDescription(offer).then((a) => console.log("Offer set!"));

        rc.createAnswer().then(a => rc.setLocalDescription(a)).then(a => console.log("answer created"))

    }
    return (
        <> 
           <video autoPlay   id="remoteVideo" controls /> 
           <video autoPlay  id="viduser2" controls />
           {offer?<div id="acceptingBox">
          <h4> Do you want to accept call from this {acceptor} ?</h4> 
           <div style={{display:"flex",justifyContent:"center",alignItems:"center",columnGap:"20px"}}>
           <button className="acceptOrDecilineCall" onClick={()=>offer?createAnswer(offer):""}>Yes</button>
           <button className="acceptOrDecilineCall" onClick={()=>dispatch(setOFFER({offer:"",name:"Eve"}))}>No</button>
            </div>  
           </div>:""}
          
        </>
    )
}

