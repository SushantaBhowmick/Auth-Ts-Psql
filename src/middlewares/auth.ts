import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import jwt from 'jsonwebtoken'

const SECRET_KEY='saodfuewrw098eu09342rj'

export const isAuthenticatedUser=async(req:any,res:Response,next:NextFunction)=>{
    const token = req.cookies['token']
    if(!token){
        return res.status(401).json({
            success:false,
            msg:"Please login to access this resource"
        })
    }
    const decoded:any = jwt.verify(token,SECRET_KEY);
    if(!decoded.userId){
        return res.status(401).json({
            success:false,
            msg:"Invalid Token"
        })
    }
    req.user = await User.findByPk(decoded.userId)
    
    next();
}