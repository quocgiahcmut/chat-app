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
try {
	mongoose.connect(process.env.MONGO_URL);
	console.log('mongodb is connected');
} catch (error) {
	console.log('cannot connect mongodb: ', error);
}
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/ping', (req, res) => {
	res.json('pong');
});

app.get('/messages/:userId', async (req, res) => {});

app.get('/people', async (req, res) => {
	const users = await User.find({}, { _id: 1, username: 1 });
	res.json(users);
});

app.get('/profile', (req, res) => {
	const token = req.cookies?.token;
	if (token) {
		jwt.verify(token, jwtSecret, {}, (err, userData) => {
			if (err) throw err;
			res.json(userData);
		});
	} else {
		res.status(401).json('no token');
	}
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const foundUser = await User.findOne({ username });
	if (foundUser) {
		const checkPass = bcrypt.compareSync(password, foundUser.password);
		if (checkPass) {
			jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
				res.cookie('token', token, { sameSite: 'none', secure: true }).json({
					id: foundUser._id,
				});
			});
		}
	}
});

app.post('/logout', (req, res) => {
	res.cookie('token', '', { sameSite: 'none', secure: true }).json('ok');
});

app.post('/register', async (req, res) => {
	const { username, password } = req.body;
	try {
		const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
		const createdUser = await User.create({
			username: username,
			password: hashedPassword,
		});

		jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
			if (err) throw err;
			res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
				id: createdUser._id,
			});
		});
	} catch (err) {
		if (err) throw err;
		res.status(500).json('error');
	}
});

const server = app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server listen on http://localhost:4040`);
});
