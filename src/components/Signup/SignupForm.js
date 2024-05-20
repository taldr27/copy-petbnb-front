import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import signUpUser from '../../redux/thunks/signUpThunk';
import '../Login/LoginForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      user: {
        name,
        email,
        password,
      },
    };
    dispatch(signUpUser(credentials));
    navigate('/');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
        <h2>Create your account</h2>
        <label htmlFor="name" id="name">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email" id="email">
          Email
          <br />
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
        <button type="submit">Sign up</button>
      </form>
      <div className="new-user">
        <p>Already have an account?</p>
        <a href="/login">Sign in</a>
      </div>
    </div>
  );
};

export default SignUpForm;
