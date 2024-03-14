import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
interface Token {
  userId?: string;
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: Token;
      isAdmin: Boolean;
    }
  }
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers["authorization"] || "";
  if (token) {
    try {
      const decodedToken = verify(
        token,
        process.env.JWT_SECRET_KEY || ""
      ) as Token;

      req.user = decodedToken;
      req.isAdmin = decodedToken.role?.toLowerCase() == "admin";

      next();
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  } else {
    res.status(404).json({
      message: "Not Authorized",
    });
  }
};
