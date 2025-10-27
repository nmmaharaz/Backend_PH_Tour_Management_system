/* eslint-disable @typescript-eslint/no-explicit-any */
import { IErrorSources } from "../interfaces/error.types"
import httpStatus from "http-status-codes";


const handleZodError = (err: any) => {
    const errorSources : IErrorSources[] = []
    const errors = err.issues
    const statusCode = httpStatus.BAD_REQUEST
    errors.forEach((error: any) => errorSources.push(
        {
            path: error.path[error.path.length - 1],
            message: error.message
        }
    ))
    const message = "Zod Validation Error"
    return {
        statusCode,
        message,
        errorSources
    }
}

export default handleZodError;