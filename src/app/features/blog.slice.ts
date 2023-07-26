import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blog.service';
import { BlogAttributes, BlogUpdate } from '../../types/blog.type';

const fetchAll = createAsyncThunk('blogs/fetchAll', async () => {
  const response = await blogService.getAll();
  return response;
});

const fetchOne = createAsyncThunk('blogs/fetchOne', async (id: BlogAttributes['id']) => {
  const response = await blogService.getById(String(id));
  return response;
});

const createOne = createAsyncThunk('blogs/createOne', async (blog: BlogAttributes) => {
  const response = await blogService.createOne(blog);
  return response;
});

const updateOne = createAsyncThunk('blogs/updateOne', async (blog: BlogAttributes) => {
  const update: BlogUpdate = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
  };

  const response = await blogService.updateOne(blog.id, update);
  return response;
});

const deleteOne = createAsyncThunk('blogs/deleteOne', async (id: BlogAttributes['id']) => {
  await blogService.deleteOne(id);
  return id;
});

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    all: [] as BlogAttributes[],
    one: {} as BlogAttributes,
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
      state.all = state.all.map((blog) => (blog.id === action.payload.id ? { ...blog, ...action.payload } : blog));
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
      state.all = state.all.filter((blog) => blog.id !== action.payload);
    });
    builder.addCase(deleteOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

const blogThunk = {
  fetchAll,
  fetchOne,
  createOne,
  updateOne,
  deleteOne,
};

export default blogThunk;
