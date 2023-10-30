import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Task = ({ task,displayTasks }) => {
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setIsCompleted(task.isCompleted)
  }, [task])
  
  const changeCompletedStatus = () => {
    const data = {
        isCompleted: !isCompleted
    }
    axios.put(`http://0.0.0.0:5000/tasks/${task.id}`, data)
    .then((response) => {
        setIsCompleted(!isCompleted)
    })
    .catch(error => {
        console.log('Error message:', error);
    });
  }

  const handleDescriptionUpdate = (value) => {
    const data = {
        description: value
    }
    axios.put(`http://0.0.0.0:5000/tasks/${task.id}`, data)
    .then((response) => {
        setDescription(value)
    })
    .catch(error => {
        console.log('Error message:', error);
    });
  }

  const handleDeleteTask = () => {
    axios.delete(`http://0.0.0.0:5000/tasks/${task.id}`)
    .then((response) => {
        displayTasks()
    })
    .catch(error => {
        console.log('Error message:', error);
    });
  }

  const handleDragStart = (event) => {
    event.dataTransfer.setData('TaskId', task.id);
  };

  const handleDragEnd = (event) => {
    event.dataTransfer.clearData('TaskId');
  };  

  return (
    <div 
        className="task-item" 
        id={task.id} draggable="true" 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
    >
        <input 
            className="check-box" 
            type="checkbox" 
            checked={isCompleted} 
            onChange={changeCompletedStatus}
        />
        <input
            className="task"
            type="text"
            defaultValue={task.description}
            onChange={(e) => handleDescriptionUpdate(e.target.value)}
        />
        <button type="button" onClick={handleDeleteTask}>X</button>
    </div>
  );
};

export default Task