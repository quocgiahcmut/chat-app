const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const ws = require('ws');
const fs = require('fs');

const User = require('./models/User');

//config
dotenv.config();
// mongoose.connect(process.env.MONGO_URL, (err) => {
//   if (err) console.log('cannot connect to mongo:', err);
// });
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  res.json('pong');
});

app.get('/messages/:userId', async (req, res) => {});

app.get('/people', async (req, res) => {});

app.get('/profile', (req, res) => {});

app.post('/login', async (req, res) => {});

app.post('/logout', (req, res) => {});

app.post('/register', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const createdUser = await User.create({
      username: username,
      password: password,
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json('error');
  }
});

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listen on http://localhost:4040`);
});
