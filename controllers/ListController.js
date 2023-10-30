const List = require('../models/list');

const createList = async (req, res) => {
  try {
    const { title, UserId } = req.body;
    const newList = await List.create({ title, UserId });
    res.status(201).json(newList);
  } catch (error) {
    console.error('List creation error:', error);
    res.status(500).json({ message: 'List creation failed' });
  }
};

const getUserLists = async (req, res) => {
  try {
    const { UserId } = req.params;
    const lists = await List.findAll({ where: { UserId : UserId } });
    res.status(200).json(lists);
  } catch (error) {
    console.error('Get user lists error:', error);
    res.status(500).json({ message: 'Failed to fetch user lists' });
  }
};

const updateList = async (req, res) => {
  const ListId = req.params.ListId;
  const { title } = req.body;

  try {
    const list = await List.findByPk(ListId);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    list.title = title;
    await list.save();

    return res.status(200).json({ message: 'List updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteList = async (req, res) => {
  const ListId = req.params.ListId;

  try {
    const list = await List.findByPk(ListId);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    await list.destroy();

    return res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createList,
  getUserLists,
  updateList,
  deleteList,
};