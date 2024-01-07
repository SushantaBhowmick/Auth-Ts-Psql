import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { Database } from './sequelize';
import User from './models/userModel';
const app = express()
const port = 4000;

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cookieParser())

//Database connect
Database;
app.get('/',(req:Request,res:Response)=>{
    res.send("Hello and welcome")
})

//Routes
import userRoutes from './routes/userRoutes'
app.use('/api',userRoutes)

app.listen(port,()=>{
    console.log(`Server is working on: ${port}`);
})