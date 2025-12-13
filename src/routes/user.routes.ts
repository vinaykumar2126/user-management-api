import { Router } from "express";
import { requireRole } from "../middleware/role.middleware";
import {
  registerUser,
  getUsers,
  getUser,
  deleteUser
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.get("/", authMiddleware,requireRole('ADMIN'), getUsers);
router.get("/:id",authMiddleware, getUser);
router.delete("/:id", deleteUser);

export default router;

