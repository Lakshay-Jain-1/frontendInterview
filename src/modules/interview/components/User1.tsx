import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setANSWER, setOFFER } from "../../../store/slices/interviewRound";
import { accessAnswer } from "../../../controller/api-sharingSdp";
import { RootState } from "../../../store/store";

function User1() {
  const answer = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const answering = useSelector((state: RootState) => state.interview.answer);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);

  const configuration = {
    iceServers: [
      {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: [
          "turn:global.relay.metered.ca:80",
          "turn:global.relay.metered.ca:80?transport=tcp",
          "turn:global.relay.metered.ca:443",
          "turns:global.relay.metered.ca:443?transport=tcp",
        ],
        username: "0cd9ccb34e98b4f6c74f93ba",
        credential: "8fYmVjwNW0bjHZ51",
      },
    ],
  };
     
  useEffect(() => {
    let gettingAnswer: NodeJS.Timeout;
    createOffer()
    accessingAnswer();
    if (answering) {
      handleAnswer(answering);
      gettingAnswer = setInterval(() => {
        accessingAnswer();
      }, 1000);
    } 
    
    return () => {
      if (gettingAnswer) {
        clearInterval(gettingAnswer);
      }
    };
  }, []);

  async function accessingAnswer() {
    try {
      const data = await accessAnswer("Alice");
      console.log(data);
      if(data.answer){
      dispatch(setANSWER({ name: "Alice", answer: data.answer }));
      handleAnswer(data.answer);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAnswer = async (answerData: string) => {
    if (!peerConnection) return;
    
    try {
      const answers = JSON.parse(answerData);
      await peerConnection.setRemoteDescription(answers);
      
      if (dataChannel?.readyState === "open") {
        dataChannel.send("hellooooo");
      } else {
        console.log("Data channel is not open");
      }
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  };
   
  setInterval(()=>{accessingAnswer()},2000)

  const createOffer = async () => {
    const videos: HTMLVideoElement | null = document.getElementById("vid") as HTMLVideoElement;
    const newPeerConnection = new RTCPeerConnection(configuration);
    const newDataChannel = newPeerConnection.createDataChannel("channel");
    
    setPeerConnection(newPeerConnection);
    setDataChannel(newDataChannel);

    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: true,
      });

      if (videos) {
        videos.srcObject = localStream;
      }

      localStream.getTracks().forEach((track) => {
        if (newPeerConnection) {
          newPeerConnection.addTrack(track, localStream);
        }
      });

      newDataChannel.onmessage = (e) => console.log("Just got a message: " + e.data);
      newDataChannel.onopen = () => console.log("Connection opened!");

      const remoteVideo: HTMLVideoElement | null = document.querySelector("#User1");
      
      newPeerConnection.addEventListener("track", async (event) => {
        const [remoteStream] = event.streams;
        if (remoteVideo) {
          remoteVideo.srcObject = remoteStream;
        }
      });

      newPeerConnection.onicecandidate = async (e) => {
        dispatch(setOFFER({
          offer: JSON.stringify(newPeerConnection.localDescription),
          name: "Alice"
        }));
        console.log("New Ice Candidate! Reprinting SDP: " + JSON.stringify(newPeerConnection.localDescription));
      };

      const offer = await newPeerConnection.createOffer();
      await newPeerConnection.setLocalDescription(offer);
      console.log("set successfully!");

    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  return (
    <>
      {/* <button className="createAlink"  onClick={createOffer}>Create a link</button> */}
      <video autoPlay className="firstUser"  id="User1" controls />
      <video autoPlay className="secondUser" id="vid" controls />
    </>
  );
}

export default User1;