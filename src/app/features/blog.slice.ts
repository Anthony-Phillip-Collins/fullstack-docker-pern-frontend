import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blog.service';
import { BlogAttributes, BlogCreation, BlogUpdate, ReadersAttributes } from '../../types/blog.type';
import { ReadingAttributes } from '../../types/reading.type';
import { UserAttributes } from '../../types/user.type';
import { serializeFrontendError } from '../../util/frontendErrorParser';
import { RootState } from '../store';
import { getAuthUser } from './auth.slice';
import { getAllReadings } from './reading.slice';
import { getAllUsers } from './user.slice';

const fetchAll = createAsyncThunk('blogs/fetchAll', async (_, thunkApi) => {
  try {
    return await blogService.getAll();
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

const fetchOne = createAsyncThunk('blogs/fetchOne', async (id: BlogAttributes['id'], thunkApi) => {
  try {
    return await blogService.getById(id);
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

const createOne = createAsyncThunk('blogs/createOne', async (blog: BlogCreation, thunkApi) => {
  try {
    return await blogService.createOne(blog);
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

const updateOne = createAsyncThunk('blogs/updateOne', async (blog: BlogAttributes, thunkApi) => {
  const update: BlogUpdate = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
  };

  try {
    return await blogService.updateOne(blog.id, update);
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

const deleteOne = createAsyncThunk('blogs/deleteOne', async (id: BlogAttributes['id'], thunkApi) => {
  try {
    await blogService.deleteOne(id);
    return id;
  } catch (error) {
    const serializedError = serializeFrontendError(error);
    return thunkApi.rejectWithValue(serializedError);
  }
});

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    all: [] as BlogAttributes[],
    one: null as BlogAttributes | null,
    status: 'idle',
    error: null as Error | null,
  },
  reducers: {
    clearBlogError: (state) => {
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
      state.error = serializeFrontendError(action.payload);
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
      state.error = serializeFrontendError(action.payload);
    });
    builder.addCase(updateOne.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateOne.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.all = state.all.map((blog) => (blog.id === action.payload.id ? { ...blog, ...action.payload } : blog));
      state.one = action.payload;
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
      state.all = state.all.filter((blog) => blog.id !== action.payload);
    });
    builder.addCase(deleteOne.rejected, (state, action) => {
      state.status = 'failed';
      state.error = serializeFrontendError(action.payload);
    });
  },
});

export const getAllBlogs = (state: RootState): BlogAttributes[] => state.blogs.all;
export const getOneBlog = (state: RootState): BlogAttributes | null => state.blogs.one;

export const getBlogById = (state: RootState, id: BlogAttributes['id']) =>
  getAllBlogs(state).find((blog) => blog.id === id);

const populateReadersToBlog = (readings: ReadingAttributes[], users: UserAttributes[], blog: BlogAttributes) => {
  const readers = [] as BlogAttributes['readers'];
  readings
    .filter((reading) => reading.blogId === blog.id)
    .forEach((reading) => {
      const user = users.find((user) => user.id === reading.userId);
      if (user) {
        const item: ReadersAttributes = {
          name: user.name,
          id: user.id,
          reading: {
            read: reading.read,
          },
        };
        if (readers) {
          readers.push(item);
        }
      }
    });

  const blogPopulated: BlogAttributes = {
    ...blog,
    readers,
  };

  return blogPopulated;
};

export const getAllBlogsPopulated = createSelector(
  [getAllBlogs, getAllUsers, getAllReadings],
  (blogs, users, readings) => {
    if (!blogs || !users || !readings) {
      return [];
    }
    return blogs.map((blog) => {
      return populateReadersToBlog(readings, users, blog);
    });
  },
);

export const getOneBlogPopulated = createSelector(
  [getAllReadings, getAllUsers, getOneBlog],
  (readings, users, blog) => {
    if (!users || !readings || !blog) {
      return null;
    }
    return populateReadersToBlog(readings, users, blog);
  },
);

export const getBookmarksOfAuthUser = createSelector(
  [getAllBlogsPopulated, getAllReadings, getAuthUser, (_state, isRead?: boolean) => isRead],
  (blogs, readings, user, isRead) => {
    if (!user || !blogs || !readings) {
      return [];
    }
    const all = blogs.filter((blog) => {
      return readings.find(({ userId, blogId, read }) => {
        const belongsToUser = user.id === userId && blog.id === blogId;
        const isReadExists = isRead === true || isRead === false;
        return isReadExists ? belongsToUser && read === isRead : belongsToUser;
      });
    });

    return all;
  },
);

export const { clearBlogError } = blogSlice.actions;

const blogThunk = {
  fetchAll,
  fetchOne,
  createOne,
  updateOne,
  deleteOne,
};

export default blogThunk;
