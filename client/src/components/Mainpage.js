import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';

function MainPage ({ user }) {

  const [lists, setLists] = useState([]);
  const [timeChanged, setTimeChanged] = useState(0);

  const displayLists = () => {
    axios.get(`http://0.0.0.0:5000/lists/${user.id}`)
    .then(response => {
      setLists(response.data);
    })
    .catch(error => {
      console.log('Error message:', error);
    });
  }

  useEffect(() => {
    displayLists();
  }, [timeChanged])

  const handleCreateList = () => {
    const data = {
      title: 'List '+(lists.length+1),
      UserId: user.id
    };
    axios.post('http://0.0.0.0:5000/lists', data)
    .then((response) => {
      displayLists()
    })
    .catch(error => {
      console.log('Error message:', error);
    });
  }

  return (
    <div className="main-page-container">
      <div className="lists-container">
        {lists.map((list) => (
          <List key={list.id} list={list} setTimeChanged={setTimeChanged} timeChanged={timeChanged}/>
        ))}
      </div>
      <div className='create-list'>
        <div className='create-list-heading'>Create List</div>
        <div className='add-list-button'>
          <button type="button" onClick={handleCreateList}>+</button>
        </div>
      </div>
    </div>
  );
};

MainPage.defaultProps = {
    title: 'Welcome to Task Board! Please log in to continue.'
}

export default MainPage