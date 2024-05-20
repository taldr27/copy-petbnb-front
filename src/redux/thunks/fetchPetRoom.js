import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchPetRoom = createAsyncThunk('fetchRoom', async (petRoomId) => {
  const response = await axios.get(`http://127.0.0.1:3001/pet_rooms/${petRoomId}`);
  return response.data;
});

export default fetchPetRoom;
