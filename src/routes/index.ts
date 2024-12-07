import { Router } from "express";
import userRoute from "./user.routes";

// Index
const indexRoute = Router();

indexRoute.get("", async (req, res) => {
  res.json({ message: "Hello  World" });
});

indexRoute.use("/users", userRoute);

export default indexRoute;
