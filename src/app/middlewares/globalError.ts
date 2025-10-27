/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVers } from "../config/env";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { IErrorSources } from "../interfaces/error.types";
import handleDuplicateError from "../helpers/handleDuplicateError";
import handleCastError from "../helpers/handleCastError";
import handleValidationError from "../helpers/handleValidationError";
import handleZodError from "../helpers/handleZodError";


export const globalError = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (envVers.NODE_ENV === "development") console.log(err, "from global error handler");
    let statusCode = 500
    const stack = envVers.NODE_ENV === "development" ? err.stack : null
    let message = "Something went wrong"

    let errorSources: IErrorSources[] = []

    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
    }
    else if (err.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources
    }
    else if (err.name === "ZodError") {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack,
        err: envVers.NODE_ENV === "development" ? err : null,
        errorSources
    })
}