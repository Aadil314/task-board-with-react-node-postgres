const express = require('express');
const router = express.Router();
const ListController = require('../controllers/ListController');

router.post('/', function (req, res) {
  ListController.createList(req, res);
});

router.get('/:UserId', function (req, res) {
  ListController.getUserLists(req, res);
});

router.put('/:ListId', function (req, res) {
  ListController.updateList(req, res);
});

router.delete('/:ListId', function (req, res) {
  ListController.deleteList(req, res);
});

module.exports = router;
