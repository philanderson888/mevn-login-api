var express = require("express");
var router = express.Router();
const { Todo } = require("../db");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../constants");

const verifyToken = (req, res, next) => {
  console.log(`verifying token`)
  try {
    console.log(`jwt authorises header ${req.headers.authorization} with secret ${SECRET}`)
    req.user = jwt.verify(req.headers.authorization, SECRET);
    console.log(`request user = `)
    console.log(req.user)
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401);
  }
};

router.get("/", verifyToken, async (req, res) => {
  console.log(`request to root folder for user`)
  console.log(req.user)
  const { _id } = req.user;
  const todos = await Todo.find({ user: _id });
  console.log(`todos found for user = ${todos}`)
  res.json(todos);
});

router.get("/:id", verifyToken, async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const todo = await Todo.findOne({ _id: id, user: _id });
  console.log(`finding one to do item ${todo}`)
  res.json(todo);
});

router.post("/", verifyToken, async (req, res) => {
  const { name, done } = req.body;
  const { _id } = req.user;
  const todo = new Todo({ name, done, user: _id });
  console.log(`creating new todo item ${todo}`)
  await todo.save();
  res.json(todo);
});

router.put("/:id", verifyToken, async (req, res) => {
  const { name, done } = req.body;
  const { id } = req.params;
  const todo = await Todo.findOneAndUpdate({ _id: id }, { name, done });
  await todo.save();
  res.json(todo);
});

router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  await Todo.deleteOne({ _id: id });
  res.status(200).send();
});

module.exports = router;
