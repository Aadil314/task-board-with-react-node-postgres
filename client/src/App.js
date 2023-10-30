import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Login from './components/Login';
import MainPage from './components/Mainpage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      axios.get(`http://0.0.0.0:5000/check-auth/${storedToken}`)
      .then((response) => {
        setUser({
          id: response.data.userId,
          username: response.data.username,
          token: response.data.token
        })
      })
      .catch((error) => {
        console.error('Authentication error:', error);
        setUser(null);
      });
    } else {
      setUser(null);
    }
  }, []);

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  }
  

  return (
    <div className="container">
      {user ? (
        <Header title={`Welcome ${user.username}`} logOut={logOut} />
        ) : (
        <Header title="Welcome to Task Board! Please log in to continue." />
      )}
      {user ? (
        <MainPage user={user} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;
