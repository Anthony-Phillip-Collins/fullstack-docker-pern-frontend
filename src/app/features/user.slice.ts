import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import userService from '../../services/user.service';
import { UserAttributes, UserCreateInput } from '../../types/user.type';

const fetchAll = createAsyncThunk('users/fetchAll', async () => {
  const response = await userService.getAll();
  return response;
});

const fetchOne = createAsyncThunk('users/fetchOne', async (id: UserAttributes['id']) => {
  const response = await userService.getById(String(id));
  return response;
});

const createOne = createAsyncThunk('users/createOne', async (user: UserCreateInput) => {
  const response = await userService.createOne(user);
  return response;
});

const updateOne = createAsyncThunk('users/updateOne', async (user: UserAttributes) => {
  console.log('/////');
  console.log(user);
  console.log('/////');

  // const update: UserUpdateAsAdmin = {
  //   name: user.name,
  //   username: user.username,
  //   password: user.password,
  // };

  // const response = await userService.updateOne(user.id, update);
  // return response;
});

const deleteOne = createAsyncThunk('users/deleteOne', async (id: UserAttributes['id']) => {
  await userService.deleteOne(id);
  return id;
});

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    all: [] as UserAttributes[],
    one: {} as UserAttributes,
    status: 'idle',
    error: null as string | null | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.all = action.payload;
    });
    builder.addCase(fetchAll.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.one = action.payload;
    });
    builder.addCase(fetchOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(createOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createOne.fulfilled, (state) => {
      state.status = 'succeeded';
      // state.one = action.payload;
    });
    builder.addCase(createOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(updateOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // state.all = state.all.map((user) => (user.id === action.payload.id ? { ...user, ...action.payload } : user));
    });
    builder.addCase(updateOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(deleteOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.all = state.all.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

const userThunk = {
  fetchAll,
  fetchOne,
  createOne,
  updateOne,
  deleteOne,
};

export default userThunk;
