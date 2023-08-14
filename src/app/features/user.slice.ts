import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import userService from '../../services/user.service';
import { BlogAttributes } from '../../types/blog.type';
import { ReadingAttributes } from '../../types/reading.type';
import { Readings, UserAttributes, UserCreateInput, UserUpdateAsUserInput, UserWithToken } from '../../types/user.type';
import { serializeFrontendError } from '../../util/frontendErrorParser';
import { RootState } from '../store';
import { getAuthUser } from './auth.slice';

const fetchAll = createAsyncThunk('users/fetchAll', async (_, thunkApi) => {
  try {
    return await userService.getAll();
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

const fetchOne = createAsyncThunk('users/fetchOne', async (id: UserAttributes['id'], thunkApi) => {
  try {
    return await userService.getById(id);
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

const createOne = createAsyncThunk('users/createOne', async (user: UserCreateInput, thunkApi) => {
  let userWithToken: UserWithToken | null = null;

  try {
    userWithToken = await userService.createOne(user);
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }

  if (!userWithToken) {
    const serializedError: Error = {
      name: 'UserCreateError',
      message: 'User was not created',
    };
    return thunkApi.rejectWithValue(serializedError);
  }

  try {
    return await userService.getById(userWithToken.id);
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

const updateOne = createAsyncThunk('users/updateOne', async (user: UserAttributes, thunkApi) => {
  const update: UserUpdateAsUserInput = {
    name: user.name,
  };

  try {
    return await userService.updateOne(user.username, update);
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

const deleteOne = createAsyncThunk('users/deleteOne', async (username: UserAttributes['username'], thunkApi) => {
  try {
    return await userService.deleteOne(username);
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    all: [] as UserAttributes[],
    one: null as UserAttributes | null,
    status: 'idle',
    error: null as Error | null,
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
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
      state.error = serializeFrontendError(action.payload);
      console.log('fetchAll.rejected', action.error);
    });
    builder.addCase(fetchOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload) state.one = action.payload;
    });
    builder.addCase(fetchOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = serializeFrontendError(action.payload);
    });

    builder.addCase(createOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.one = action.payload;
      state.all.push(state.one);
    });
    builder.addCase(createOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = serializeFrontendError(action.payload);
    });
    builder.addCase(updateOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.one = action.payload;
      state.all = state.all.map((user) => (user.id === action.payload.id ? { ...user, ...action.payload } : user));
    });
    builder.addCase(updateOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = serializeFrontendError(action.payload);
    });
    builder.addCase(deleteOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.all = state.all.filter((user) => user.username !== action.payload);
    });
    builder.addCase(deleteOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = serializeFrontendError(action.payload);
    });
  },
});

export const getAllUsers = (state: RootState) => state.users.all;

export const getUserById = (state: RootState, userId: UserAttributes['id']) =>
  getAllUsers(state).find((user) => user.id === userId);

const populateReadingsToUser = (readings: ReadingAttributes[], blogs: BlogAttributes[], user: UserAttributes) => {
  const readingsOfUser = (readings || []).filter((reading) => reading.userId === user.id);

  const array: UserAttributes['readings'] = [];

  readingsOfUser.forEach((reading) => {
    const blog = blogs.find((blog) => blog.id === reading.blogId);
    if (blog) {
      const item: Readings = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        reading,
      };
      array.push(item);
    }
  });

  const blogsOfUser = (blogs || []).filter((blog) => {
    const ownerId = blog?.owner?.id || blog.ownerId;
    return ownerId === user.id;
  });

  const userPopulated: UserAttributes = {
    ...user,
    blogs: blogsOfUser,
    readings: array,
  };

  return userPopulated;
};

const allBlogs = (state: RootState) => state.blogs.all;
const allReadings = (state: RootState) => state.readings.all;

export const getAllUsersPopulated = createSelector([getAllUsers, allBlogs, allReadings], (users, blogs, readings) => {
  if (!users) {
    return [];
  }
  return users.map((user) => {
    return populateReadingsToUser(readings, blogs, user);
  });
});

export const getOneUserPopulated = createSelector(
  [getAllUsers, allBlogs, allReadings, getUserById],
  (users, blogs, readings, user) => {
    if (!users || !blogs || !readings || !user) {
      return null;
    }
    return populateReadingsToUser(readings, blogs, user);
  },
);

export const getAuthUserPopulated = createSelector([getAuthUser, allBlogs, allReadings], (user, blogs, readings) => {
  if (!user || !blogs || !readings) {
    return null;
  }
  return populateReadingsToUser(readings, blogs, user);
});

export const { clearUserError } = userSlice.actions;

const userThunk = {
  fetchAll,
  fetchOne,
  createOne,
  updateOne,
  deleteOne,
};

export default userThunk;
