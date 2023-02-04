import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from '../api/request';

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (user, thunkAPI) => {
    try {
      const response = await request.login(user);
      const { accessToken } = response?.data;
      return accessToken;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const getMeAsync = createAsyncThunk(
  'auth/getMeAsync',
  async (params, thunkAPI) => {
    try {
      const response = await request.getMyInfo();
      return response?.data[0];
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    error: null,
  },
  reducers: {
    auth: (state, action) => {
      state.currentUser = action.payload;
    },
    clearError:(state)=>{
        state.error=null
    },
    logout: (state, action) => {
      //   window.location.reload();
      localStorage.clear();
      window.location.replace('/login');
      //   state.currentUser = null;
    },
  },
  extraReducers: {
    [loginAsync.fulfilled]: (state, action) => {
      state.error = null;
      if (action.payload) {
        localStorage.setItem('accessToken', action.payload);
        window.location.reload();
      }
    },
    [loginAsync.rejected]: (state, action) => {
      state.error = action?.payload?.data;
    },
    [getMeAsync.fulfilled]: (state, action) => {
      state.currentUser = action?.payload;
    },
    [getMeAsync.rejected]: (state, action) => {
      state.error = action?.payload?.message;
      localStorage.clear();
    },
  },
});

export const { auth, logout,clearError } = authSlice.actions;
export default authSlice.reducer;
