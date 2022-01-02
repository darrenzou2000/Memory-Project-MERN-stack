import express from "express";
import bodyParser from "body-parser";
// import  MongoClient from  'mongodb';
import Mongoose  from "mongoose";
import cors from "cors"
import postRoutes from "./routes/posts.js"


//enviormental variables
import dotenv from 'dotenv'
dotenv.config()


//REMEMBER TO ADD "type":"module", below "main" in package.jsonw
const app = express();



app.use(bodyParser.json({limit: "30mb",extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended:true}));
app.use(cors());


app.use("/posts",postRoutes)



const PORT = process.env.PORT;
console.log(PORT)
console.log(process.env.CONNECTION_URL)

Mongoose.connect(process.env.CONNECTION_URL).then(()=>{
    app.listen(PORT, () => console.log("Server Running on port",PORT))
}).catch((e)=> console.log("error connecting to db:",e.message))



