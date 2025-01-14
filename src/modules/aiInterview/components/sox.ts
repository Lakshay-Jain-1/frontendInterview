export type SoxRecordingOptions = {
    sampleRate: number;
    channels: number;
    compress: boolean;
    threshold: number;
    silence: string;
    endOnSilence: boolean;
    audioType: string;
  };
  
  const debug = console.debug 
  
  export class SoxRecording {
    private options: SoxRecordingOptions;
    private mediaRecorder: MediaRecorder | undefined;
    private audioStream: MediaStream | undefined;
    private audioChunks: Blob[] = [];
  
    constructor(options = {}) {
      const defaults = {
        sampleRate: 16000,
        channels: 1,
        compress: false,
        threshold: 0.5,
        silence: "1.0",
        endOnSilence: false,
        audioType: "audio/wav",
      };
  
      this.options = Object.assign(defaults, options);
      debug("Started recording");
      debug(this.options);
  
      return this.start();
    }
  
    start() {
      // Request access to the user's microphone
      navigator.mediaDevices
        .getUserMedia({ audio: { sampleRate: this.options.sampleRate, channelCount: this.options.channels } })
        .then((stream) => {
          this.audioStream = stream;
  
          // Create a MediaRecorder instance for capturing audio
          this.mediaRecorder = new MediaRecorder(stream, {
            mimeType: this.options.audioType,
          });
  
          // Event listener for when data is available during the recording
          this.mediaRecorder.ondataavailable = (event) => {
            this.audioChunks.push(event.data);
            debug(`Recording ${event.data.size} bytes`);
          };
  
          this.mediaRecorder.onstop = () => {
            debug("Recording stopped");
          };
  
          // Start recording
          this.mediaRecorder.start();
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
  
      return this;
    }
  
    stop() {
      if (!this.mediaRecorder) {
        throw new Error("Recording not yet started");
      }
      this.mediaRecorder.stop();
      this.audioStream?.getTracks().forEach((track) => track.stop());
    }
 
  
    pause() {
      if (!this.mediaRecorder) {
        throw new Error("Recording not yet started");
      }
      this.mediaRecorder.pause();
      debug("Paused recording");
    }
  
    resume() {
      if (!this.mediaRecorder) {
        throw new Error("Recording not yet started");
      }
      this.mediaRecorder.resume();
      debug("Resumed recording");
    }
  
    isPaused() {
      if (!this.mediaRecorder) {
        throw new Error("Recording not yet started");
      }
      return this.mediaRecorder.state === "paused";
    }
  
    stream(): ReadableStream<Uint8Array> {
      if (!this.audioChunks.length) {
        throw new Error("Recording not yet started");
      }
  
      // Convert the audio chunks to a readable stream
      const reader = new ReadableStream<Uint8Array>({
        start(controller) {
          this.audioChunks.forEach((chunk) => {
            const uint8Array = new Uint8Array(chunk);
            controller.enqueue(uint8Array);
          });
          controller.close();
        },
      });
  
      return reader;
    }
  }
  