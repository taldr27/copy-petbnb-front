/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearToken } from '../slices/authSlice';

const headers = {
  headers: {
    ContentType: 'application/json',
    Authorization: localStorage.getItem('token'),
  },
};

const logout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
  try {
    const response = await axios.delete('http://127.0.0.1:3001/logout', headers);
    if (response.status === 200) {
      dispatch(clearToken());
      return true;
    }
    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return error;
  }
});

export default logout;
