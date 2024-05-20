import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken } from '../slices/authSlice';

const signUpUser = createAsyncThunk('signup', async (credentials, { dispatch }) => {
  const response = await fetch('http://127.0.0.1:3001/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        name: credentials.user.name,
        email: credentials.user.email,
        password: credentials.user.password,
      },
    }),
  });

  if (response.ok) {
    const token = response.headers.get('Authorization');
    dispatch(setToken(token));
    return token;
  }
  throw new Error('Sign up error');
});

export default signUpUser;
