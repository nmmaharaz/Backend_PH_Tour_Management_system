/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { BookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";


// const createBooking = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
//     const user = req.user as JwtPayload
//     const users = await BookingService.createBooking(req.body, user.userId);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Users retrieved successfully",
//         data:null,
//         // meta: users.meta
//     })
// })

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const decodeToken = req.user as JwtPayload
    const booking = await BookingService.createBooking(req.body, decodeToken.userId);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking,
    });
});

const getAllBooking = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const users = await BookingService.getAllBooking(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data:null,
        // // meta: users.meta
    })
})
const updateBooking = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const users = await BookingService.updateBooking(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data:null,
        // // meta: users.meta
    })
})
const deleteBooking = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const users = await BookingService.deleteBooking(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data:null,
        // // meta: users.meta
    })
})



export const BookingController = {
    createBooking,
    getAllBooking,
    updateBooking,
    deleteBooking
}