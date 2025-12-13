import * as express from "express";
import User from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}

