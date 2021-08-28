var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../db');
const { SECRET } = require('../constants');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const url = "http://77.99.118.2"
//const url = "https://flamboyant-banach-405870.netlify.app"

router.post('/register', async (req, res) => {
  const { name, password } = req.body;
  const existingUser = await User.findOne({ name });
  if (existingUser) {
    return res.json({ err: 'user already exists' }).status(401);
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    password: hashedPassword
  })
  await user.save();
  res.header("Access-Control-Allow-Origin", url)
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept")
  res.json(user).status(201);
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const { _id, password: userPassword } = await User.findOne({ name });
  const match = await bcrypt.compare(password, userPassword);
  if (match) {
    const token = await jwt.sign({ name, _id }, SECRET);
    return res.json({ token });
  }
  res.header("Access-Control-Allow-Origin", url)
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept")
  res.status(401);
});

module.exports = router;