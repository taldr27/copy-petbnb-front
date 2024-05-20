import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  headers: {
    ContentType: 'application/json',
    Authorization: localStorage.getItem('token'),
  },
};

export const fetchRooms = createAsyncThunk('fetchRooms', async () => {
  const response = await axios.get('http://127.0.0.1:3001');
  return response.data.data;
});

export const fetchMyRooms = createAsyncThunk('fetchMyRooms', async () => {
  const response = await axios.get('http://127.0.0.1:3001/pet_rooms', headers);
  return response.data.data;
});

export const fetchRoomId = createAsyncThunk('fetchRooms', async (roomId) => {
  const response = await axios.get(`http://127.0.0.1:3001/pet_rooms/${roomId}`);
  return response.data.data.attributes;
});
