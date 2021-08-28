const { Schema, createConnection } = require('mongoose');
const connection = createConnection('mongodb://localhost:27017/mevn-example', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Schema({
  name: String,
  password: String
});

const User = connection.model('User', userSchema);

const todoSchema = new Schema({
  name: String,
  done: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Todo = connection.model('Todo', todoSchema);

module.exports = {
  User,
  Todo
}