import { Request, Response, NextFunction } from "express";
import { findUserById } from "../models/user.model";

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.session?.userId;

  if (!userId || !findUserById(userId)) {
    return res.status(401).json({
      message: "Authentication required.",
    });
  }

  next();
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Authentication required.",
    });
  }

  const user = findUserById(userId);

  if (!user) {
    return res.status(401).json({
      message: "Invalid session.",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required.",
    });
  }

  next();
}