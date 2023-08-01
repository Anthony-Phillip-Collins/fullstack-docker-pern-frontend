import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import { UserAttributes, UserCreateInput, UserLogin } from '../../types/user.type';

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

const refresh = createAsyncThunk('auth/refresh', async () => {
  // Add a delay to minimise invalidation on rapid refresh
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await authService.refresh();
  const user = await authService.getAuthUser();
  return user;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as UserAttributes | null,
    status: 'idle',
    error: null as unknown,
  },
  reducers: {},
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
        state.user = {} as UserAttributes;
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
      .addCase(refresh.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

const authThunk = { logIn, logOut, signUp, refresh };

export default authThunk;
