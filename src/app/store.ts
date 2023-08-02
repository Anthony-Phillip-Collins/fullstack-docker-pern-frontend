import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './features/auth.slice';
import { blogSlice } from './features/blog.slice';
import { notificationSlice } from './features/notification.slice';
import { readingSlice } from './features/reading.slice';
import { userSlice } from './features/user.slice';

const store = configureStore({
  reducer: {
    blogs: blogSlice.reducer,
    users: userSlice.reducer,
    auth: authSlice.reducer,
    readings: readingSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
