import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import readingService from '../../services/reading.service';
import { BlogAttributes } from '../../types/blog.type';
import { ReadingAttributes, ReadingCreation, ReadingUpdate } from '../../types/reading.type';
import { Readings, UserAttributes } from '../../types/user.type';
import { RootState } from '../store';
import { getBlogById } from './blog.slice';

const fetchAll = createAsyncThunk('readings/fetchAll', async () => {
  const response = await readingService.getAll();
  return response;
});

const fetchOne = createAsyncThunk('readings/fetchOne', async (id: ReadingAttributes['id']) => {
  const response = await readingService.getById(id);
  return response;
});

const createOne = createAsyncThunk('readings/createOne', async (reading: ReadingCreation) => {
  const response = await readingService.createOne(reading);
  // thunkApi.dispatch(authThunk.refresh());
  return response;
});

const updateOne = createAsyncThunk('readings/updateOne', async (reading: ReadingAttributes) => {
  const update: ReadingUpdate = {
    read: reading.read,
  };

  const response = await readingService.updateOne(reading.id, update);
  return response;
});

const deleteOne = createAsyncThunk('readings/deleteOne', async (id: ReadingAttributes['id'], thunkApi) => {
  // const state = thunkApi.getState() as RootState;
  // const blogId = state.readings.all.find((reading: ReadingAttributes) => reading.id === id)?.blogId;

  await readingService.deleteOne(id);

  // if (blogId) {
  //   thunkApi.dispatch(blogThunk.fetchOne(blogId));
  // }

  return id;
});

export const readingSlice = createSlice({
  name: 'readings',
  initialState: {
    all: [] as ReadingAttributes[],
    one: {} as ReadingAttributes,
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
    builder.addCase(createOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.all.push(action.payload);
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
      state.all = state.all.map((reading) =>
        reading.id === action.payload.id ? { ...reading, ...action.payload } : reading,
      );
      state.one = action.payload;
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
      state.all = state.all.filter((reading) => reading.id !== action.payload);
    });
    builder.addCase(deleteOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const getAllReadings = (state: RootState) => state.readings.all;

export const getReadingsByUserId = (state: RootState, userId: UserAttributes['id']) =>
  getAllReadings(state).filter((props) => userId === props.userId);

export const getReadingsByBlogId = (state: RootState, blogId: BlogAttributes['id']) =>
  getAllReadings(state).filter((props) => blogId === props.blogId);

export const getReadingsOfUser = (state: RootState, userId: UserAttributes['id']) => {
  const readings = getReadingsByUserId(state, userId);
  return readings
    .map((reading) => {
      const blog = getBlogById(state, reading.blogId);
      if (!blog) {
        return null;
      }
      const item: Readings = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        reading: {
          id: reading.id,
          read: reading.read,
        },
      };

      return item;
    })
    .filter((item) => item !== null);
};

const readingThunk = {
  fetchAll,
  fetchOne,
  createOne,
  updateOne,
  deleteOne,
};

export default readingThunk;
