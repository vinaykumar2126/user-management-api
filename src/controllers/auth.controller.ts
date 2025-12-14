import {Request, Response} from 'express';
import { authService } from '../services/auth.service';

export const registerUser = async(req:Request,res:Response)=>{
    try{
        const {name,email,password,role} = req.body;
        const user = await authService.register(name,email,password,role);
        res.status(201).json({user});
    }catch(error:any){
        res.status(500).json({message:error.message});
    }
}

export const loginUser = async(req:Request,res:Response)=>{
    try{
    const {email,password} = req.body;
    const data = await authService.login(email,password);
    res.status(200).json(
        {user: data.user, token: data.token});
    }catch(error:any){
        res.status(500).json({ message: error.message });
    }
}

