import express from 'express';
import path from 'path';
import {ENV} from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import {serve} from "inngest/express";

const app = express();
const __dirname = path.resolve();

//middleware
app.use(express.json());
//credentials: true meaning server allows a browser to include cookie on request
app.use(cors({origin: ENV.CORS_ORIGIN,credentials: true}));

app.use("/api/inngest",serve({client:inngest,functions}))

app.get("/API",(req,res) => {
    res.status(200).json({message:"Welcome to Talent IQ API"});
})

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend","dist")))
    app.get("/{*any}",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
} 

const startServer = async () => {
    try{
        await connectDB();
        app.listen(ENV.PORT, () => {
        console.log("Server is running on port:", ENV.PORT);});
    }catch(error){
        console.error("Error starting server",error);
    }
}

startServer();