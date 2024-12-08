import { NextFunction, Request, Response } from "express";
import prisma from "../client";

// Creating a task
export async function createTask(req: Request, res: Response, next: NextFunction) {
  try {

    const task = await prisma.task.create({
      data: req.body,
    });

    res.status(201).json({
      status: true,
      message: "Task Successfully Created",
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

// Get all Tasks
export async function getTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const tasks = await prisma.task.findMany();

    res.json({
      status: true,
      message: "Tasks Successfully fetched",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
}

// Get all a single task
export async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { taskId } = req.params;
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });

    res.json({
      status: true,
      message: "Task Successfully fetched",
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

// deleting a task
export async function deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { taskId } = req.params;

  try {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      res.status(401).json({
        status: false,
        message: "Task not found",
      });
      return;
    }
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    }),
      res.json({
        status: true,
        message: "Task Successfully deleted",
      });
  } catch (error) {
    next(error);
  }
}

// Updating a single task
export async function updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { taskId } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      res.status(404).json({
        status: false,
        message: "Task not found",
      });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: req.body,
    });

    res.json({
      status: true,
      message: "Task Successfully updated",
      data: updatedTask,
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler (if any)
  }
}

