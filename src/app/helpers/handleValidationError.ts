/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { IErrorSources } from "../interfaces/error.types";
import httpStatus from "http-status-codes";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const errorSources: IErrorSources[] = []
    const errors = Object.values(err.errors)
    errors.forEach((messageObj: any) => errorSources.push({
        path: messageObj.path,
        message: messageObj.message
    }))
    const statusCode = httpStatus.BAD_REQUEST
    const message = "Validation Error"
    return {
        statusCode,
        message,
        errorSources
    }
}

export default handleValidationError;