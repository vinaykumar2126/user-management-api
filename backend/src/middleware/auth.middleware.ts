import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const authMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).json({message:"Unauthorized"});
    }
    const token = header.split(" ")[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as {id:string};
        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        req.user=user;
        next();
    }catch(err){
        return res.status(401).json({message:"invalid token"});
    }
}
