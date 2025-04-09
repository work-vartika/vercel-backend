const express = require("express");
const app = express();
const logger = require("./winston")
const cors = require("cors");
app.use(cors({
    origin: 'https://vercel-frontend-eight.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
require('dotenv').config();

const PORT = process.env.PORT
const URI = process.env.MongoURI

const mongoose = require("mongoose")
const userRouter = require("./Router/routes")

app.use('/user',userRouter)

async function dbConnect(){
    try {
        await mongoose.connect(URI);
        logger.info("MongoDB Connection Successful!");
      } catch (err) {
        logger.error("MongoDB Connection Failed:", err);
      }
}

dbConnect();

app.listen(PORT,()=>{
    // console.log(`Server is running on ${PORT}`);
    logger.info(`Server is running on ${PORT}`)
})

app.get('/',(req,res)=>{
  res.send("This is backend")
})