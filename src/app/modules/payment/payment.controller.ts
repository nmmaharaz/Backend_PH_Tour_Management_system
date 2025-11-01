/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { PaymentService } from "./payment.service";


const createPayment = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const users = await PaymentService.createPayment(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: null,
        // meta: 
    })
})

const getAllPayment = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const users = await PaymentService.getAllPayment(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: null,
        // meta: 
    })
})
const updatePayment = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const users = await PaymentService.updatePayment(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: null,
        // meta: 
    })
})
const deletePayment = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const users = await PaymentService.deletePayment(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: null,
        // meta: 
    })
})



export const PaymentController = {
    createPayment,
    getAllPayment,
    updatePayment,
    deletePayment
}