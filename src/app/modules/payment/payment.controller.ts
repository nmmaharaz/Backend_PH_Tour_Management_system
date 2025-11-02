/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PaymentService } from "./payment.service";
import { envVars } from "../../config/env";
import { sendResponse } from "../../utils/sendResponse";


const initPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const booking = await PaymentService.initPayment(req.params.bookingId);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking,
    });
})
const successPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await PaymentService.successPayment(req.query as Record<string, string>);
    if (result.success) {
        res.redirect(`${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${req.query.transactionId}&message=${result.message}&amount=${req.query.amount}&status=${req.query.status}`)
    }
})
const failPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await PaymentService.failPayment(req.query as Record<string, string>);
    if (!result.success) {
        res.redirect(`${envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${req.query.transactionId}&message=${result.message}&amount=${req.query.amount}&status=${req.query.status}`)
    }
})
const cancelPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await PaymentService.cancelPayment(req.query as Record<string, string>);
    if (!result.success) {
        res.redirect(`${envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${req.query.transactionId}&message=${result.message}&amount=${req.query.amount}&status=${req.query.status}`)
    }
})



export const PaymentController = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment
}