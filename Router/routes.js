const express = require("express");
const router = express.Router();
const user = require('../Models/userModel')


const registerUser = require("../Controllers/register")
const loginUser = require("../Controllers/login")


router.post('/register',registerUser)
router.post('/login',loginUser)



router.get('/',async(req,res)=>{
const users = await user.find();
    res.json({message:users})
})

module.exports = router;