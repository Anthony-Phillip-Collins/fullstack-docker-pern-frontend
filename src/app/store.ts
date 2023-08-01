import { configureStore } from '@reduxjs/toolkit';
import { blogSlice } from './features/blog.slice';
import { userSlice } from './features/user.slice';
import { authSlice } from './features/auth.slice';
import { readingSlice } from './features/reading.slice';

const store = configureStore({
  reducer: {
    blogs: blogSlice.reducer,
    users: userSlice.reducer,
    auth: authSlice.reducer,
    readings: readingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
