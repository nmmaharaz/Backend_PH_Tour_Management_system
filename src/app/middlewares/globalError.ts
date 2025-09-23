/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVers } from "../config/env";
import AppError from "../errorHelpers/AppError";

export const globalError = (err:any, req: Request, res: Response, next: NextFunction )=>{
    let statusCode = 500
    const stack = envVers.NODE_ENV === "development"? err.stack : null
    let message = "Something went wrong"
    
    if(err instanceof AppError){
        statusCode = err.statusCode
        message = err.message
    }else if(err instanceof Error){
        statusCode = 500;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack,
        err
    })
}