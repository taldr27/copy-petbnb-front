import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  headers: {
    ContentType: 'application/json',
    Authorization: localStorage.getItem('token'),
  },
};

export const fetchPets = createAsyncThunk('fetchPet', async () => {
  const response = await axios.get('http://127.0.0.1:3001/pets/', headers);
  return response.data;
});

export const fetchPet = createAsyncThunk('fetchPet', async (petId) => {
  const response = await axios.get(`http://127.0.0.1:3001/pets/${petId}`, headers);
  return response.data;
});

export const deletePet = createAsyncThunk('deletePet', async (petId) => {
  const response = await axios.delete(`http://127.0.0.1:3001/pets/${petId}`, headers);
  return response.data;
});

export const createPet = createAsyncThunk('createPet', async (credentials) => {
  const response = await fetch('http://127.0.0.1:3001/pets', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    body: credentials,
  });
  return response.data;
});

export const editPet = createAsyncThunk('createPet', async (props) => {
  const { formData, petId } = props;
  const response = await fetch(`http://127.0.0.1:3001/pets/${petId}`, {
    method: 'PUT',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    body: formData,
  });
  return response.data;
});
