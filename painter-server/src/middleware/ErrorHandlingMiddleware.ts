import { Request, Response, NextFunction } from 'express';
import ApiError from "../error/ApiError";

module.exports = function (err, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    console.log(err)
    return res.status(500).json({message: "Internal server error!"})
}