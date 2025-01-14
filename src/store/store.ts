import { configureStore } from '@reduxjs/toolkit'
import technical from "./slices/technicalRoundSlice"
import interview from "./slices/interviewRound"
import aiInterview from "./slices/aiInterview"
export const store = configureStore({
  reducer: {
    technical,
    interview,
    aiInterview
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch