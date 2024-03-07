const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    password:String
})

userSchema.pre('save',async function(next){
    //object user
    const user = this;
    if (user.isModified('password')){
        user.password=await bcrypt.hash(user.password,10)
    }
    next();
})


const User = mongoose.model('User',userSchema)

module.exports=User;
