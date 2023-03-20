import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.reducer';

export const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export const RootState = store.getState;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const AppDispatch = store.dispatch;