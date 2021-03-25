import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', {
      email: email,
      password: password
    }).then(res => {
      console.log(res.data)
      localStorage.setItem("auth", true);
      history.push('/')
    }).catch(err => console.log("Login Error", err))
  }

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
          <h2>Sign In</h2>
          <form onSubmit={onSubmit}>
            <div className='form-control'>
                <label htmlFor="email">Email</label>
                <input type='email' name='email' onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='form-control'>
                <label htmlFor="password">Password</label>
                <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className='submit'>
                <button>Sign In</button>
            </div>
          </form>
          <a href="/register">Create New Account</a>
      </div>
  </div>
  );
}