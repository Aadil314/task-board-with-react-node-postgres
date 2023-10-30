const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Users = require('./models/user');
const port = 5000;

const app = express();

app.use(cors());

app.use(express.json());

const initDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    startServer();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    console.log('Retrying backend server in 5 seconds...');
    setTimeout(initDatabaseConnection, 5000); // Retry the connection after 5 seconds
  }
};

const startServer = () => {
  // routes
  const userRoutes = require('./routes/userRoutes');
  const listRoutes = require('./routes/listRoutes');
  const taskRoutes = require('./routes/taskRoutes');

  app.use('/users', userRoutes);
  app.use('/lists', listRoutes);
  app.use('/tasks', taskRoutes);

  app.get('/check-auth/:token', function (req, res) {
    console.log('😅')
    const token = req.params.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    
    jwt.verify(token, 'This_is_a_secret_key', async (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      const userObj = await Users.findOne({ where: { id: user.userId } });
      res.status(200).json({ message: 'Authenticated', userId: user.userId, username: userObj.username, token: token});
    });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Start the initial database connection
initDatabaseConnection();
