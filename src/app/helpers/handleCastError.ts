/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes" 
import mongoose from "mongoose";

const handleCastError = (err: mongoose.Error.CastError) => {
    const statusCode = httpStatus.BAD_REQUEST
    const message = `Invalid MongoDB ObjectID.Please provide a vaild id.`
    return { statusCode, message };
}

export default handleCastError;
