var express = require("express");
var router = express.Router();
const { Todo } = require("../db");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../constants");

const verifyToken = (req, res, next) => {
  try {
    req.user = jwt.verify(req.headers.authorization, SECRET);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401);
  }
};

router.get("/", verifyToken, async (req, res) => {
  const { _id } = req.user;
  const todos = await Todo.find({ user: _id });
  res.json(todos);
});

router.get("/:id", verifyToken, async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const todo = await Todo.findOne({ _id: id, user: _id });
  res.json(todo);
});

router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;
  const todo = new Todo({ name, done: false, user: _id });
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
