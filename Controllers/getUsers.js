const user = require('../Models/userModel')

const readUser=async(req,res)=>{
try{

   
   const users= await user.find();

    res.status(200).json({
        message:"users",
        user:users
    
    })
    
}catch(e){
    console.log("error in reading",e);
}
}
module.exports=readUser;