import { ApiError } from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";

export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });
    next();
  } catch (err: any) {
    next(new ApiError(400, "Validation error", err.errors || []));
  }
};
