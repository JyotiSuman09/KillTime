import { Router } from "express";
import userRoute from "./user.routes";
import taskRoute from "./task.routes";

// Index
const indexRoute = Router();

indexRoute.get("", async (req, res) => {
  res.json({ message: "Hello  World" });
});

// TODO: validate request before processing
//  - valid request body
//  - params passed correctly for get/:id , patch/:id and delete/:id
indexRoute.use("/users", userRoute);
indexRoute.use("/tasks", taskRoute);

export default indexRoute;
