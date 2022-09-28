import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_TO_BACKEND } from '../../constants/common';
import { getRefreshToken } from '../../cookies/cookie';
import { IAuth } from '../../interface/IAuth';

const initialValue: IAuth = {
  id: 0,
  username: '',
  email: '',
  status: 'loading',
};

export const checkToken = createAsyncThunk('authInfo/checkRefreshToken', async (): Promise<any> => {
  const response = await axios.post(process.env.REACT_APP_URL_TO_BACKEND + '/token', {
    refreshToken: getRefreshToken(),
  });
  return response.data;
});

export const authSlice = createSlice({
  name: 'authInfo',
  initialState: initialValue,
  reducers: {
    setAuthWithLoginResponse: (state, action) => {
      state.id = action.payload.data.id;
      state.username = action.payload.data.name;
      state.email = action.payload.data.email;
      state.status = 'fulfilled';
    },
    resetAuth: (state) => {
      state.id = 0;
      state.username = '';
      state.email = '';
      state.status = 'rejected';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.id = action.payload.data.id;
        state.username = action.payload.data.name;
        state.email = action.payload.data.email;
      })
      .addCase(checkToken.rejected, (state) => {
        state.status = 'rejected';
        state.id = 0;
        state.username = '';
        state.email = '';
      });
  },
});

export const { setAuthWithLoginResponse, resetAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
