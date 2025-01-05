import { configureStore } from '@reduxjs/toolkit'
import technicalReducer from "./slices/technicalRoundSlice"
import interviewReducer from "./slices/interviewRoud"
export const store = configureStore({
  reducer: {
    technical: technicalReducer,
    interview: interviewReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch