const mongoose = require('mongoose');
const { use } = require('../routes/users');
const bcrypt = require('bcrypt');
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
});
userSchema.pre('save',function(next){
   if(this.password&&this.isModified('password')){
    bcrypt.hash(this.password,10,(err,hash)=>{
        if(err)return next(err);
        this.password=hash;
        return next();
    })
   } 
   else{
    next();
   }
})
const User=mongoose.model('User',userSchema);
module.exports=User;