import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import userService from '../../services/user.service';
import { BlogAttributes } from '../../types/blog.type';
import { ReadingAttributes } from '../../types/reading.type';
import { Readings, UserAttributes, UserCreateInput, UserUpdateAsUserInput } from '../../types/user.type';
import { RootState } from '../store';
import { getAuthUser } from './auth.slice';

const fetchAll = createAsyncThunk('users/fetchAll', async () => {
  const response = await userService.getAll();
  return response;
});

const fetchOne = createAsyncThunk('users/fetchOne', async (id: UserAttributes['id']) => {
  const response = await userService.getById(id);
  return response;
});

const createOne = createAsyncThunk('users/createOne', async (user: UserCreateInput) => {
  const response = await userService.createOne(user);
  return response;
});

const updateOne = createAsyncThunk('users/updateOne', async (user: UserAttributes) => {
  const update: UserUpdateAsUserInput = {
    name: user.name,
  };
  const response = await userService.updateOne(user.username, update);
  return response;
});

const deleteOne = createAsyncThunk('users/deleteOne', async (username: UserAttributes['username']) => {
  await userService.deleteOne(username);
  return username;
});

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    all: [] as UserAttributes[],
    one: null as UserAttributes | null,
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
      if (action.payload) state.one = action.payload;
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
      state.one = action.payload;
      state.all = state.all.map((user) => (user.id === action.payload.id ? { ...user, ...action.payload } : user));
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
      state.all = state.all.filter((user) => user.username !== action.payload);
    });
    builder.addCase(deleteOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
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

const userThunk = {
  fetchAll,
  fetchOne,
  createOne,
  updateOne,
  deleteOne,
};

export default userThunk;
