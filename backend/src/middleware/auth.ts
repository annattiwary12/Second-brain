import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export function userAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      });
      return;
    }

    const result = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    if (!result?.id) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    req.user = { userId: result.id };

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(500).json({
      success: false,
      error: "Authentication failed",
    });
  }
}
