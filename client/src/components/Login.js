import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false); 
    const [error, setError] =useState('');
  
    const handleLogin = () => {
      
      if(username === '' || password === ''){
        setError("Please enter a username and password")
        return
      }
      const data = {
        username: username,
        password: password,
      };
      axios.post('http://0.0.0.0:5000/users/login', data)
      .then(response => {
        const token = response.data.token;

        setUser({
          id: response.data.user.id,
          username: response.data.user.username,
          token: token
        });

        localStorage.setItem('token', token);
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.message)
        } else if (error.request) {
          setError("No response received from the server.");
        } else {
          setError("Error while making the request.");
        }
      });
    }
  
    const handleShowSignUp = () => {
      setShowSignUp(true); 
    }
  
    const handleBackToLogin = () => {
      setShowSignUp(false);
    }
  

    const handleCreateAccount = () => {
      if(confirmPassword !== password){
        setError('Passwords do not match!')
        return
      }
      if(username === '' || password === ''){
        setError("Please enter a username and password")
        return
      }
      const data = {
        username: username,
        password: password,
      };
      axios.post('http://0.0.0.0:5000/users/register', data)
      .then(response => {
        handleLogin()
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.message)
        } else if (error.request) {
          setError("No response received from the server.");
        } else {
          setError("Error while making the request.");
        }
      });
    }

  return (
    <div className='login-page-container'>
      <form className='login-form'>
        {showSignUp ? (<div className='login-header'>Sign up</div>) : (<div className='login-header'>Login</div>)}
        <div className='login-field'>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='login-field'>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {showSignUp &&(
          <div className='login-field'>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        )}
        {error &&( <div style={{color:'rgb(75, 44, 4)'}}>{error}</div>)}
        {showSignUp ? (
          <div style={{marginTop:'7px'}}>
            <button className='btn' type="button" onClick={handleBackToLogin}>Back to Login</button>
            <button className='btn'type="button" onClick={handleCreateAccount}>Create Account</button>
          </div>
        ) : (
          <div style={{marginTop:'7px'}}>
            <button className='btn' type="button" onClick={handleLogin}>Login</button>
            <button className='btn' type="button" onClick={handleShowSignUp}>Sign up</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;