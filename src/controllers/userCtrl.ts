import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


const SECRET_KEY='saodfuewrw098eu09342rj'


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
//register users
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        success: false,
        msg: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
      name,
      email,
      password:hashedPassword,
    });
    res.status(201).json({
      success: true,
      msg: "User Created Successfully!",
      user,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error" });
  }
};

const options={
    httpOnly:true,
}

//login users
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        msg: "User Doesn't exists",
      });
    }
    const isMatched = await bcrypt.compare(password,userExists.password)
    if (!isMatched) {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
      const token= jwt.sign({userId:userExists.id},SECRET_KEY,{expiresIn:'1d'})
      res.cookie('token',token,options)

    res.status(200).json({
      success: true,
      msg: "Logged In Successfully!",
      userExists,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error" });
  }
};


//logout user
export const logoutUser = async (req: Request, res: Response) => {
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:false,
    })
  
    res.status(200).json({
        success: true,
        msg: "Logged Out Successfully!",
      });
}

//get profile
export const loadUser =  async (req: any, res: Response) =>{
    try {
      const result:any = await User.findByPk(req.user.id)
        return res.status(200).json({
                success:true,
                msg:`Welcome back ${result.name}`,
                result
        })
    // console.log(req.user.id);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" });
    }
}

// update profile
export const updateProfile=async(req:any,res:Response)=>{
  const { name, email } = req.body;
    try {
        const result:any = await User.findByPk(req.user.id)
        if(!result){
            return res.status(404).json({
                success:false,
                msg:"User not found"
            })
        }
        await result.update({name,email})
        return res.status(200).json({
            success:true,
            msg:"User updated successfully!",
            result
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" });
    }
}

// Delete profile
export const deleteProfile=async(req:any,res:Response)=>{
    try {
        const result:any = await User.findByPk(req.user.id)
        if(!result){
            return res.status(404).json({
                success:false,
                msg:"User not found"
            })
        }
        await result.destroy();
        return res.status(200).json({
            success:true,
            msg:"User deleted successfully!",
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" });
    }
}