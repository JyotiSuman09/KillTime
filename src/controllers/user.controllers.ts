import { NextFunction, Request, Response } from "express";
import prisma from "../client";

// Creating a user
export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {

    const user = await prisma.user.create({
      data: req.body,
    });

    res.status(201).json({
      status: true,
      message: "User Successfully Created",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

// Get all Users
export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany();

    res.json({
      status: true,
      message: "Users Successfully fetched",
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

// Get all a single user
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    res.json({
      status: true,
      message: "User Successfully fetched",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

// deleting a user
export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(401).json({
        status: false,
        message: "User not found",
      });
      return;
    }
    await prisma.user.delete({
      where: {
        id: userId,
      },
    }),
      res.json({
        status: true,
        message: "User Successfully deleted",
      });
  } catch (error) {
    next(error);
  }
}

// Updating a single user
export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: req.body,
    });

    res.json({
      status: true,
      message: "User Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler (if any)
  }
}

