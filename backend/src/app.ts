import express, { Application } from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());

// routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// global error handler
app.use(errorHandler);

export default app;
