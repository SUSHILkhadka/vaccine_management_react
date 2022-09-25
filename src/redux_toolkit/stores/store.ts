import { configureStore } from '@reduxjs/toolkit';
import { allergyReducer } from '../slices/allergySlice';
import { authReducer } from '../slices/authSlice';
import { vaccineReducer } from '../slices/vaccineSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    vaccine: vaccineReducer,
    allergy: allergyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;