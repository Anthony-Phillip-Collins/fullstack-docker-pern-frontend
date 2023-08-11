import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import { UserAttributes, UserCreateInput, UserLogin } from '../../types/user.type';
import { RootState } from '../store';

const logIn = createAsyncThunk('auth/logIn', async (credentials: UserLogin) => {
  await authService.logIn(credentials);
  const user = await authService.getAuthUser();
  return user;
});

const logOut = createAsyncThunk('auth/logOut', async () => {
  const response = await authService.logOut();
  return response;
});

const signUp = createAsyncThunk('auth/signUp', async (userData: UserCreateInput) => {
  await authService.signUp(userData);
  const user = await authService.getAuthUser();
  return user;
});

const fetchAuthUser = createAsyncThunk('auth/getAuthUser', async () => {
  const response = await authService.getAuthUser();
  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as UserAttributes | null,
    status: 'idle',
    error: null as unknown,
  },
  reducers: {
    removeAuthUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logIn.fulfilled, (state, payload) => {
        state.status = 'idle';
        state.user = payload.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(logOut.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(fetchAuthUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(fetchAuthUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

export const getAuthUser = (state: RootState) => state.auth.user;

export const { removeAuthUser } = authSlice.actions;

const authThunk = { logIn, logOut, signUp, fetchAuthUser };

export default authThunk;
