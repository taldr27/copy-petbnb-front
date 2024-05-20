import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  headers: {
    ContentType: 'application/json',
    Authorization: localStorage.getItem('token'),
  },
};

const deletePetRoom = createAsyncThunk('deleteRoom', async (petRoomId) => {
  const response = await axios.delete(`http://127.0.0.1:3001/pet_rooms/${petRoomId}`, headers);
  return response.data;
});

export default deletePetRoom;
