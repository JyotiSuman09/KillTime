import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controllers";
import { validateSchema } from "../middlewares/validation.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";

// Tasks layout Route
const taskRoute = Router();

taskRoute.post("", validateSchema(createTaskSchema), createTask);
taskRoute.get("", getTasks);
taskRoute.get("/:taskId", getTask);
taskRoute.delete("/:taskId", deleteTask);
taskRoute.patch("/:taskId", validateSchema(updateTaskSchema), updateTask);

export default taskRoute;
