const jwt = require('jsonwebtoken');
const auth=(req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(token==="null"){
        return res.json({message:"Token Not Found",success:"failed"});
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.json({
                message:"Invalid Token",
                success:"failed",
        });
        }
        req.user=decoded;
        next();
    })
}
module.exports={auth};