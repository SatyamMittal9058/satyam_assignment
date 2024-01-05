const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    });

userSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

userSchema.methods.matchpassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

const user = mongoose.model('user', userSchema);
module.exports = user;
