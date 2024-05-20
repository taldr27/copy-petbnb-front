import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loginUser from '../../redux/thunks/loginThunk';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      user: {
        email,
        password,
      },
    };
    dispatch(loginUser(credentials));
    navigate('/');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
        <h2>Login</h2>
        <label htmlFor="email" id="email">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" id="password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <div className="new-user">
        <p>Don&apos;t have an account?</p>
        <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
};

export default LoginForm;
