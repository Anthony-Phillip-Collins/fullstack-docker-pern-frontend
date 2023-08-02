import { createSlice } from '@reduxjs/toolkit';
import { NotificationType } from '../../types/notification.type';

import type { PayloadAction } from '@reduxjs/toolkit';
import store from '../store';

const initialState: NotificationType = {
  message: '',
  error: null,
};

let timeoutId: ReturnType<typeof setTimeout>;

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationType>) => {
      const { message, error } = action.payload;
      state.message = message;
      state.error = error;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => store.dispatch(clearNotification()), 1000);
    },
    clearNotification: (state) => {
      state.message = initialState.message;
      state.error = initialState.error;
      clearTimeout(timeoutId);
    },
  },
});

export const { clearNotification, setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
