import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controllers";
import { validateSchema } from "../middlewares/validation.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

// Users layout Route
const userRoute = Router();

userRoute.post("", validateSchema(createUserSchema), createUser);
userRoute.get("", getUsers);
userRoute.get("/:userId", getUser);
userRoute.delete("/:userId", deleteUser);
userRoute.patch("/:userId", validateSchema(updateUserSchema), updateUser);

export default userRoute;
