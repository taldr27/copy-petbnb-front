import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  headers: {
    ContentType: 'application/json',
    Authorization: localStorage.getItem('token'),
  },
};
export const fetchUser = createAsyncThunk('fetchUser', async (userId) => {
  const response = await axios.get(`http://127.0.0.1:3001/users/${userId}`, headers);
  return response.data;
});

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  const response = await axios.get('http://127.0.0.1:3001/users/', headers);
  return response.data;
});

export const fetchCurrentUser = createAsyncThunk('fetchCurrentUser', async () => {
  const response = await axios.get('http://127.0.0.1:3001/current_user', headers);
  return response.data;
});

export const editUser = createAsyncThunk('editUser', async (userId, body) => {
  const response = await axios.put(`http://127.0.0.1:3001/users/${userId}`, body, headers);
  return response.data;
});
