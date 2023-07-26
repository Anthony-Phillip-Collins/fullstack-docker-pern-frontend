import { configureStore } from '@reduxjs/toolkit';
import { blogSlice } from './features/blog.slice';

const store = configureStore({
  reducer: {
    blogs: blogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
