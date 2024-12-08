import { Router } from "express";
import userRoute from "./user.routes";
import taskRoute from "./task.routes";

// Index
const indexRoute = Router();

indexRoute.get("", async (req, res) => {
  res.json({ message: "Hello  World" });
});

indexRoute.use("/users", userRoute);
indexRoute.use("/tasks", taskRoute);

export default indexRoute;
