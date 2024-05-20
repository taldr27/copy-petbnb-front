import { createAsyncThunk } from '@reduxjs/toolkit';

const addRoomThunk = createAsyncThunk('postRoom', async (credentials) => {
  const response = await fetch('http://127.0.0.1:3001/pet_rooms', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    body: credentials,
  });
  return response.data;
});

export default addRoomThunk;
