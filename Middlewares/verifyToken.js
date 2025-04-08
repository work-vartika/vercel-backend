const jwt = require('jsonwebtoken')
const secretKey = 'vartika'

const middleware=async(req,res,next)=>{
    const token = req.header('Authorization')?.split(" ")[1] // Get token from Authorization header

    if (!token) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
    }
    try{

          // Verify the token using the secret key
          const decoded = jwt.verify(token, secretKey);
          // console.log("decoded->",decoded);
          req.user = decoded; 
          // console.log(req.user,"req.user"); // Store the decoded user information in the request object
          next();  // Proceed to the next middleware or route handler
        // return 
        // res.status(403).json({ message: 'Invalid or expired token' });
        

    }catch(e){
        res.json({message:e})
    }
}
module.exports=middleware;