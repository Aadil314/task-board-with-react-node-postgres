const Task = require('../models/task');

const createTask = async (req, res) => {
  try {
    const { description } = req.body;
    const ListId = req.params.ListId;
    const newTask = await Task.create({ description, ListId });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).json({ message: 'Task creation failed' });
  }
};

const getTasksInList = async (req, res) => {
  try {
    const ListId = req.params.ListId;
    const tasks = await Task.findAll({ where: { ListId } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get tasks in list error:', error);
    res.status(500).json({ message: 'Failed to fetch tasks in the list' });
  }
};

const updateTask = async (req, res) => {
  const TaskId = req.params.TaskId;
  const { description, isCompleted, ListId } = req.body;

  try {
    const task = await Task.findByPk(TaskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if(description){
      task.description = description;
    }
    if(!(isCompleted === undefined)){
      task.isCompleted = isCompleted;
    }
    if(ListId){
      task.ListId = ListId;
    }

    await task.save();

    return res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  const TaskId = req.params.TaskId;

  try {
    const task = await Task.findByPk(TaskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getTasksInList,
  createTask,
  updateTask,
  deleteTask, 
};