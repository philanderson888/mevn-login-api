var express = require('express');
var router = express.Router();
const url = "http://77.99.118.2"
//const url = "https://mevn-login-app.netlify.app"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", url)
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept")
  res.render('index', { title: 'Express By Phil Anderson' });
});

module.exports = router;
