import { useEffect,useState } from "react"
import AI from "../../../controller/api-AI"
import { Readable } from 'stream'
import { AssemblyAI, RealtimeTranscript } from 'assemblyai'
import { SoxRecording } from './sox.ts'

const User:React.FC=()=>{

    useEffect(()=>{
        //  navigator.mediaDevices.getUserMedia({audio:true,video:true}).then((stream)=>{
        //     let element:any = document.getElementById("aivideo")
        //      element.srcObject=stream
        //  })
     //  testing()
     run()
    },[])



const run = async () => {
  const client = new AssemblyAI({
    apiKey: 'a242daa6480145709fae09d816e928f4'
  })
  
const token = await client.realtime.createTemporaryToken({ expires_in : 480 });
  const SAMPLE_RATE = 16_000

  const transcriber = client.realtime.transcriber({
    token,
    sampleRate: SAMPLE_RATE
  })

  transcriber.on('open', ({ sessionId }) => {
    console.log(`Session opened with ID: ${sessionId}`)
  })

  transcriber.on('error', (error: Error) => {
    console.error('Error:', error)
  })

  transcriber.on('close', (code: number, reason: string) =>
    console.log('Session closed:', code, reason)
  )

  transcriber.on('transcript', (transcript: RealtimeTranscript) => {
    if (!transcript.text) {
      return
    }

    if (transcript.message_type === 'PartialTranscript') {
      console.log('Partial:', transcript.text)
    } else {
      console.log('Final:', transcript.text)
    }
  })

  console.log('Connecting to real-time transcript service')
  await transcriber.connect()

  console.log('Starting recording')
  const recording = new SoxRecording({
    channels: 1,
    sampleRate: SAMPLE_RATE,
    audioType: 'wav' // Linear PCM
  })

  recording.stream().pipeTo(transcriber.stream())

  // Stop recording and close connection using Ctrl-C.
  process.on('SIGINT', async function () {
    console.log()
    console.log('Stopping recording')
    recording.stop()

    console.log('Closing real-time transcript connection')
    await transcriber.close()

    process.exit()
  })
}


   
    // async function testing() {
    //     if (!window.webkitSpeechRecognition) {
    //         console.error("Speech Recognition API not supported in this browser.");
        
    //         return;
    //     }
    
    //     const recognition = new window.webkitSpeechRecognition();
    
    //     // Set language and enable continuous listening
    //     recognition.lang = "en-GB";
    //     recognition.continuous = true; // Enables continuous speech recognition
    
    //     // Optional: To improve recognition, adjust the interim results
    //     recognition.interimResults = true; // Show intermediate results
    
    //     recognition.onresult = (event) => {
    //         let transcript = '';
    //         for (let i = 0; i < event.results.length; i++) {
    //             transcript += event.results[i][0].transcript;
    //         }
    //         console.log("Speech Result:", transcript);
           
    //     };
    
    //     recognition.onspeechstart = () => {
    //         console.log("Speech started.");
    //     };
    
    //     recognition.onspeechend = () => {
    //         console.log("Speech paused.");
    //         // recognition will continue due to `continuous: true`
    //     };
    
    //     recognition.onerror = (event) => {
    //         console.error("Speech Recognition Error:", event.error);
          
    //     };
    
    //     recognition.onend = () => {
    //         console.log("Speech recognition ended.");
    //         // Optionally restart recognition automatically
    //         recognition.start();
    //     };
    
    //     recognition.start();
    //     console.log("Speech recognition started.");
    // }
    
    // document.getElementById("click").addEventListener("click", () => {
    //     if (!window.webkitSpeechRecognition) {
    //       console.error("Speech Recognition API not supported in this browser.");
    //       alert("Speech Recognition API is not supported in your browser.");
    //       return;
    //     }
      
    //     const recognition = new webkitSpeechRecognition();
    //     recognition.lang = "en-GB";
      
    //     recognition.onresult = function (event) {
    //       console.log("Speech Result:", event);
    //       document.getElementById("message").value = event.results[0][0].transcript;
    //     };
      
    //     recognition.onspeechstart = () => {
    //       console.log("Speech started.");
    //       // Optional: Ensure the video element exists before playing
    //       // const video = document.querySelector("video");
    //       // if (video) video.play();
    //     };
      
    //     recognition.onspeechend = () => {
    //       console.log("Speech ended.");
    //       // Optional: Pause video playback
    //       // const video = document.querySelector("video");
    //       // if (video) video.pause();
    //     };
      
    //     recognition.onerror = (event) => {
    //       console.error("Speech Recognition Error:", event.error);
    //       alert("An error occurred during speech recognition: " + event.error);
    //     };
      
    //     recognition.start();
    //     console.log("Speech recognition started.");
    //   });
      
    return(
        <> 
        {/* -khud ki video dekhh skta hainnn  and uski transcript banegii
        -adaptive questioning where difficulty adjusts based on performance
        
        -Allow users to focus on specific topics or areas they want to improve
         Include common follow-up questions based on typical interview patterns

        -ai assess video ko bhi capture karegaa after every 30 sec 
         analyzing non-verbal cues like eye contact, body language, and speaking pace
         Provide quantitative metrics (speaking time, filler words used, answer clarity score)
        
        - when it will ask dsa question code editor bhi laana padegaa pure page ko lee aaaungaa (tu soch rhaa hogaa ki pura kaise aayegaa)
        - After that it will form a report card question and answer honge usmein and weak points strong points and how to improve on it 
        - will give an opinated score out of 10 
    
        -------------------------------
        |   Video       question card |
        |                analyze      |
        |                transcript   |
        |                             |
         ------------------------------ */}
           
           <video controls autoPlay id="aivideo"  />
           {/* <SpeechToText/> */}
        </>
    )
}

export default User



const SpeechToText: React.FC = () => {
  const [transcription, setTranscription] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  let socket: WebSocket;

  const startRecording = () => {
    if (isRecording) return;
    setIsRecording(true);

    // Connect to AssemblyAI WebSocket endpoint
    socket = new WebSocket("wss://api.assemblyai.com/v2/stream?access_token=a242daa6480145709fae09d816e928f4");

    socket.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.text) {
        setTranscription((prev) => prev + " " + data.text); // Append new transcription text
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
      setIsRecording(false);
    };

    // Start capturing audio from the user's microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);
        const processor = audioContext.createScriptProcessor(2048, 1, 1);

        processor.onaudioprocess = (event) => {
          const inputBuffer = event.inputBuffer;
          const inputData = inputBuffer.getChannelData(0);
          // Send audio data to AssemblyAI via WebSocket
          socket.send(inputData);
        };

        mediaStreamSource.connect(processor);
        processor.connect(audioContext.destination);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    if (!isRecording) return;
    socket.close();
    setIsRecording(false);
  };

  useEffect(() => {
    // Clean up WebSocket connection when the component is unmounted
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>Live Transcription using AssemblyAI</h1>
      <p>Transcription: {transcription}</p>
      <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
      <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
    </div>
  );
};

