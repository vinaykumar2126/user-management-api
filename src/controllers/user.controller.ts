import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await userService.register(name, email, password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  res.json(await userService.getUsers());
};

export const getUser = async (req: Request, res: Response) => {
  res.json(await userService.getUser(req.params.id));
};

export const deleteUser = async (req: Request, res: Response) => {
  res.json(await userService.deleteUser(req.params.id));
};

export const updateUser = async(req:Request,res:Response)=>{
  res.json(await userService.updateUser(req.params.id,req.body));
}
