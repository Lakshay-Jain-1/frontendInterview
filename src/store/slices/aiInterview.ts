import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AiInterviewState {
  name: string;
  transcript: string;
}

const initialState: AiInterviewState = {
  name: '',
  transcript: '',
};

export const aiInterviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setTranscript: (state, action: PayloadAction<string>) => {
      state.transcript = `${state.transcript} ${action.payload}`.trim();
      console.log(state.transcript);
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setTranscript, setName } = aiInterviewSlice.actions;

export default aiInterviewSlice.reducer;
