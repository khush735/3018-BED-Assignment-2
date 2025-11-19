import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  if (err.message === "Employee not found" || err.message === "Branch not found") {
    return res.status(404).json({ success: false, message: err.message, data: null });
  }
  res.status(500).json({ success: false, message: err.message || "Internal server error", data: null });
};
