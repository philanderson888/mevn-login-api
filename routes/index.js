var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://flamboyant-banach-405870.netlify.app/")
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept")
  res.render('index', { title: 'Express By Phil Anderson' });
});

module.exports = router;
