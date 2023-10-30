import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from './Task';

const List = ({ list,timeChanged,setTimeChanged }) => {

  const [tasks, setTasks] = useState([]);
  const [listTitle, setListTitle] = useState(list.title);
  
  const displayTasks = () => {
    axios.get(`http://0.0.0.0:5000/tasks/${list.id}`)
    .then(response => {
        setTasks(response.data);
    })
    .catch(error => {
        console.log('Error message:', error);
    });
  }
  
  useEffect(() => {
    displayTasks();
  }, [timeChanged])

  const handleCreateTask = () => {
    const data = {
        description: 'Click to edit the task'
    }
    axios.post(`http://0.0.0.0:5000/tasks/${list.id}`, data)
    .then((response) => {
        displayTasks()
    })
    .catch(error => {
        console.log('Error message:', error);
    });
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const TaskId = event.dataTransfer.getData('TaskID');
    const data = {
      ListId: list.id
    }
    axios.put(`http://0.0.0.0:5000/tasks/${TaskId}`, data)
    .then((response) => {
      setTimeChanged(new Date())
    })
    .catch(error => {
        console.log('Error message:', error);
    });
  };  

  const handleTitleUpdate = (value) => {
    const data = {
      title: value
    }
    axios.put(`http://0.0.0.0:5000/lists/${list.id}`,data)
    .then((response) => {
      setListTitle(value)
    })
    .catch(error => {
        console.log('Error message:', error);
    });
  }

  const handleDeleteList = () => {
    axios.delete(`http://0.0.0.0:5000/lists/${list.id}`)
    .then((response) => {
      setTimeChanged(new Date())
    })
    .catch(error => {
        console.log('Error message:', error);
    });
  }

  return (
    <div 
      className="list-item" 
      id={list.id} 
      onDragOver={(e) => e.preventDefault()} 
      onDrop={handleDrop}
    >
      <div className="list-heading-container">
        <input
          className="list-heading"
          type="text"
          defaultValue={listTitle}
          onChange={(e) => handleTitleUpdate(e.target.value)}
        />
        <button type="button" className='delete-btn' onClick={handleDeleteList}>X</button>
      </div>
      <div className='tasks-container'>
        {tasks.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)).map((task) => (
          <Task key={task.id} task={task} displayTasks={displayTasks} />
        ))}
      </div>
      <div className='add-task-button'>
        <button type="button" className='btn' onClick={handleCreateTask}>Add Task</button>
      </div>
    </div>
  );
};

export default List