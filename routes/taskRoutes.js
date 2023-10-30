const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.post('/:ListId', function (req, res) {
  TaskController.createTask(req, res);
});

router.get('/:ListId', function (req, res) {
  TaskController.getTasksInList(req, res);
});

router.put('/:TaskId', function (req, res) {
  TaskController.updateTask(req, res);
});

router.delete('/:TaskId', function (req, res) {
  TaskController.deleteTask(req, res);
});

module.exports = router;
