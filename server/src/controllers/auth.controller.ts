import { Request, Response } from "express";
import { createUser, findUserByEmail, findUserById } from "../models/user.model";
import { comparePassword, hashPassword, isStrongPassword } from "../utils/password";

export async function registerUser(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password is too weak. Use a stronger password.",
      });
    }

    const passwordHash = await hashPassword(password);
    const newUser = createUser(username, email, passwordHash);

    if (req.session) {
      req.session.userId = newUser.id;
    }

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during registration." });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (req.session) {
      req.session.userId = user.id;
    }

    return res.status(200).json({
      message: "Login successful.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during login." });
  }
}

export function logoutUser(req: Request, res: Response) {
  if (req.session) {
    req.session = null;
  }
  return res.status(200).json({ message: "Logged out successfully." });
}

export function getCurrentUser(req: Request, res: Response) {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  const user = findUserById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
}