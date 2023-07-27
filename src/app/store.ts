import { configureStore } from '@reduxjs/toolkit';
import { blogSlice } from './features/blog.slice';
import { userSlice } from './features/user.slice';

const store = configureStore({
  reducer: {
    blogs: blogSlice.reducer,
    users: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
