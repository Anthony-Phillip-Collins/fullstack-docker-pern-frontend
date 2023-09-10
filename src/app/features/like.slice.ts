import type { SerializedError } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import likeService from '../../services/like.service';
import { BlogAttributes } from '../../types/blog.type';
import { LikeAttributes, LikeCreation } from '../../types/like.type';
import { Likings, UserAttributes } from '../../types/user.type';
import { serializeFrontendError } from '../../util/frontendErrorParser';
import { RootState } from '../store';
import { decrementLikes, getBlogById, incrementLikes } from './blog.slice';

const fetchAll = createAsyncThunk('likes/fetchAll', async () => {
  const response = await likeService.getAll();
  return response;
});

const fetchOne = createAsyncThunk('likes/fetchOne', async (id: LikeAttributes['id']) => {
  const response = await likeService.getById(id);
  return response;
});

const createOne = createAsyncThunk('likes/createOne', async (like: LikeCreation, thunkApi) => {
  try {
    const response = await likeService.createOne(like);
    thunkApi.dispatch(incrementLikes(response.blogId));
    return response;
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

const deleteOne = createAsyncThunk('likes/deleteOne', async (id: LikeAttributes['id'], thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    const blogId = state.likings.all.find((like) => like.id === id)?.blogId;
    await likeService.deleteOne(id);
    thunkApi.dispatch(decrementLikes(blogId));
    return id;
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

export const likeSlice = createSlice({
  name: 'likes',
  initialState: {
    all: [] as LikeAttributes[],
    one: {} as LikeAttributes,
    status: 'idle',
    error: null as SerializedError | Error | null,
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
      state.error = action.error;
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
      state.error = action.error;
    });
    builder.addCase(createOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.all.push(action.payload);
    });
    builder.addCase(createOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    });
    builder.addCase(deleteOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.all = state.all.filter((like) => like.id !== action.payload);
    });
    builder.addCase(deleteOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    });
  },
});

export const getAllLikings = (state: RootState) => state.likings.all;

export const getLikingsByUserId = (state: RootState, userId: UserAttributes['id']) =>
  getAllLikings(state).filter((props) => userId === props.userId);

export const getLikingsByBlogId = (state: RootState, blogId: BlogAttributes['id']) =>
  getAllLikings(state).filter((props) => blogId === props.blogId);

export const getLikingsOfUser = (state: RootState, userId: UserAttributes['id']) => {
  const likings = getLikingsByUserId(state, userId);
  return likings
    .map((liking) => {
      const blog = getBlogById(state, liking.blogId);
      if (!blog) {
        return null;
      }
      const item: Likings = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        like: {
          id: liking.id,
        },
      };

      return item;
    })
    .filter((item) => item !== null);
};

const likeThunk = {
  fetchAll,
  fetchOne,
  createOne,
  deleteOne,
};

export default likeThunk;
