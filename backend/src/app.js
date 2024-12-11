import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'


dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


import userRouter from "./routes/user.routes.js"
import eventRouter from "./routes/event.routes.js"



app.use("/api/v1/user",userRouter)
app.use("/api/v1/event",eventRouter);


// password pattern for testing : Anilpa54321

export {app};