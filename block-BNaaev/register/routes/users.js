var express = require('express');
var router = express.Router();
const User = require('../modles/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register',(req,res)=>{
  res.render('register');
})
router.post('/',function(req,res,next){
  User.create(req.body)
  .then((data)=>{
    res.send('User saved successfully!');
  })
.catch(()=>{
res.sendStatus(400).send('Something webt wrong!');
})
});
module.exports = router;
