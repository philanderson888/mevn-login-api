const { Schema, createConnection } = require('mongoose');
const dotenv = require('dotenv').config().parsed
//console.log(`mongo db username is ${process.env.VUE_APP_MONGO_DB_USERNAME}`)
//console.log(`mongo db password is ${process.env.VUE_APP_MONGO_DB_PASSWORD}`)
console.log(`mongo db username/password is hidden`)
const connection = createConnection(`mongodb+srv://${process.env.VUE_APP_MONGO_DB_USERNAME}:${process.env.VUE_APP_MONGO_DB_PASSWORD}@cluster0.iilta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });


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