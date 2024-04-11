var express = require('express');
var router = express.Router();
const User = require('../modles/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register
router.get('/register',(req,res)=>{
  res.render('register');
})

router.post('/register',function(req,res,next){
  User.create(req.body)
  .then((data)=>{
    res.redirect('/users/login');
  })
.catch(()=>{
res.sendStatus(400).send('Something webt wrong!');
})
});
// login 
router.get('/login',(req,res)=>{
  res.render("login");
})
router.post('/login',(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    res.redirect('/users/login');
    User.findOne({email})
    .then((user)=>{
      if(!user){
        return res.redirect("/users/login");
      }
      // compare password
      user.verifyPassword(password,(err,result)=>{
        if(err){
          return next(err);
        }
        if(!result){
          res.redirect("/users/login");
        }
        // persist logged in user information...
        req.session.userId=user.id;
        res.redirect("/users");
      });
    })
    .catch((err)=>{
      next(err);
    })
  }
})
module.exports = router;
