import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DsaState {
  id:number,
  question: string,
  testCase:string,
  difficulty:string,
  name:string,
  testCaseOutput:boolean,
  successful:boolean
}

const initialState: DsaState = {
  id:0,
  question: "",
  testCase:"",
  difficulty:"",
  name:"",
  testCaseOutput:false,
  successful:false
}


export const technicalSlice = createSlice({
  name: 'technical',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    add: (state,action: PayloadAction<any>) => {
      const {id,question,testCase,difficulty,name}=action.payload
      state.id = id
      state.question=question
      state.testCase=testCase
      state.difficulty=difficulty
      state.name=name

    },
    result: (state, action: PayloadAction<any>) => {
      state.testCaseOutput = true
      action.payload.trim() == "All test cases passed" ? state.successful = true : state.successful = false;
    },
    resetResult: (state) => {
      state.testCaseOutput = false
      
    }
  
  },
})

// Action creators are generated for each case reducer function
export const { add ,result,resetResult} = technicalSlice.actions

export default technicalSlice.reducer