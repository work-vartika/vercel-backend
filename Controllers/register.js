const user = require('../Models/userModel')
const bcrypt = require("bcryptjs")
const logger = require("../winston")


const registerUser = async(req,res)=>{
    try{
        const { name,email,password,role} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password." });
          }
          
        const existingUser = await user.findOne({email})
        if(existingUser){
            res.json({
                message:"user already exists !"
            })
        }

        const validRoles=['admin','user'];
        const userRole = validRoles.includes(role) ? role : 'user';

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt)
        const newUser = new user({name,email,password:hashPass,role:userRole})
        await newUser.save();
        res.status(201).json({
            message:" user registered successfully !"
            
        })

    }catch(e){
        res.status(500).json({
            message:"Error in creating user."
        })
        // console.log(e);
        logger.error(e)
        
    }
}

module.exports = registerUser;
// module.exports=createUser;