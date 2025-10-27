/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericErrorResponse } from "../interfaces/error.types";
import httpStatus from "http-status-codes";

const handleDuplicateError = (err: any): IGenericErrorResponse => {
    const DuplicateField = err.message.match(/"([^"]*)"/)[1];
    const statusCode = httpStatus.BAD_REQUEST
    const message = `${DuplicateField} already Exists!!`
    return { statusCode, message };
}

export default handleDuplicateError;