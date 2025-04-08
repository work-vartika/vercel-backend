const user = require('../Models/userModel')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = 'vartika'

const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const existingUser = await user.findOne({email});
        
        if(!existingUser){
            res.status(400).json({
                message:"User do not exist."
            })
        }
        
        const isPasswordValid = await bcrypt.compare(password,existingUser.password)
        
        if(!isPasswordValid){
            res.status(401).json({
                mesage:"invalid creds"
            })
        }

        const token = jwt.sign({ role:existingUser.role, email: existingUser.email }, secretKey, { expiresIn: '1h' });
        res.status(200).json({
            message:"User login succcessfull",token
        })
        
    }catch(e){
        res.status(500).json({
            message:"Error in login "
        })
    }
}

module.exports = loginUser;