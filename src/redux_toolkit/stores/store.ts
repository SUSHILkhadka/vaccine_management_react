import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { allergyReducer } from '../slices/allergySlice';
import { authReducer } from '../slices/authSlice';
import { vaccineReducer } from '../slices/vaccineSlice';

export const allReducers = combineReducers({
  auth: authReducer,
  vaccine: vaccineReducer,
  allergy: allergyReducer,
});

export const store = configureStore({
  reducer: allReducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
