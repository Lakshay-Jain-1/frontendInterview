import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface interviewState {
  name: string,
  acceptor:string,
  offer?:any,
  answer?:any,
}

const initialState: interviewState = {
    name: "",
    acceptor:"",
    answer:""
}


export const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    setOFFER: (state,action: PayloadAction<any>) => {
      const {offer,name}=action.payload
      state.name = name
      state.offer=offer
      

    },
    setANSWER: (state, action: PayloadAction<any>) => {
        const {answer,name}=action.payload
        state.name = name
        state.answer=answer
    },
    setAcceptor: (state, action: PayloadAction<any>) => {
        const {acceptor}=action.payload
        state.acceptor = acceptor
    }  
  }
})

// Action creators are generated for each case reducer function
export const { setOFFER,setANSWER,setAcceptor} = interviewSlice.actions

export default interviewSlice.reducer