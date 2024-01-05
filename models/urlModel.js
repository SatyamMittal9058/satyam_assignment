const mongoose=require('mongoose');
const shorturlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
    },
    shortUrl: String,
    userId:String,
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, expires: '48h', default: Date.now },
    analytics:{
        clicks:{type:Number, default:0},
    }
});
const urlSchema=mongoose.model('urlSchema',shorturlSchema);
module.exports=urlSchema;