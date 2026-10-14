import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../errors/AppError";

type PrismaErrorLike = {
  code: string;
};

const isPrismaError = (error: unknown): error is PrismaErrorLike => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string" &&
    error.code.startsWith("P")
  );
};

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (res.headersSent) {
    return;
  }

  if (error instanceof ZodError) {
    const details = error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: details,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      errorCode: error.errorCode,
      message: error.message,
    });
  }

  if (isPrismaError(error)) {
    switch (error.code) {
      case "P2002":
        return res.status(409).json({
          success: false,
          message: "A record with this value already exists",
        });

      case "P2003":
        return res.status(400).json({
          success: false,
          message: "Invalid related record",
        });

      case "P2025":
        return res.status(404).json({
          success: false,
          message: "Record not found",
        });

      case "P2021":
      case "P2022":
        return res.status(500).json({
          success: false,
          message: "Database schema error",
        });

      default:
        break;
    }
  }

  // Detailed diagnostics will be added when logging is introduced.
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorHandler;
