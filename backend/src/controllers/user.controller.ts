import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = (req.query.string as string) || "";

  const data = await userService.getUsers(page,limit,search);

  res.json(data);
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
