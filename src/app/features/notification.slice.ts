import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { NotificationType } from '../../types/notification.type';

const initialState: NotificationType = {
  message: '',
  error: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationType>) => {
      const { message, error } = action.payload;
      state.message = message;
      state.error = error;
    },
    clearNotification: (state) => {
      state.message = initialState.message;
      state.error = initialState.error;
    },
  },
});

export const { clearNotification, setNotification } = notificationSlice.actions;
