import { Request, Response, NextFunction } from "express";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).send({ message: err.message });
}
