/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError"
import { ISSLCommerz } from "../../sslCommerz/sslCommerz.interface"
import { SSLService } from "../../sslCommerz/sslCommerz.service"
import { BOOKING_STATUS } from "../booking/booking.interface"
import { Booking } from "../booking/booking.model"
import { PAYMENT_STATUS } from "./payment.interface"
import { Payment } from "./payment.model"
import httpStatus from "http-status-codes"

const initPayment = async (bookingId: string) => {
    const session = await Booking.startSession()
    session.startTransaction()
    try {
        const payment = await Payment.findOne({ booking: bookingId })

        if (!payment) {
            throw new AppError(httpStatus.BAD_REQUEST, "Payment Not Found. You have not booked this tour")
        }

        const booking = await Booking
            .findById(payment.booking)
            .populate("user", "name email phone address")

        const address = (booking?.user as any).address
        const email = (booking?.user as any).email
        const phone = (booking?.user as any).phone
        const name = (booking?.user as any).name

        const sslPayload: ISSLCommerz = {
            amount: payment.amount,
            transactionId: payment.transactionId,
            name,
            email,
            phone,
            address
        }
         console.log("Booking User Info for SSL:", sslPayload);

        const sslPayment = await SSLService.sslPaymentInit(sslPayload)

        await session.commitTransaction()
        session.endSession()
        return {
            paymentUrl: sslPayment.GatewayPageURL
        }

    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        throw err
    }
}

const successPayment = async (query: Record<string, string>) => {
    const session = await Booking.startSession()
    session.startTransaction()
    try {

        const updatedPayment = await Payment.findOneAndUpdate(
            { transactionId: query.transactionId },
            { status: PAYMENT_STATUS.PAID },
            { new: true, runValidators: true, session: session })


        await Booking.findByIdAndUpdate(
            updatedPayment?.booking,
            { status: BOOKING_STATUS.COMPLETE },
            { runValidators: true, session: session }
        )

        await session.commitTransaction()
        session.endSession()
        return { success: true, message: "Payment Completed Successfully" }

    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        throw err
    }
}

const failPayment = async (query: Record<string, string>) => {
    const session = await Booking.startSession()
    session.startTransaction()
    try {

        const updatedPayment = await Payment.findOneAndUpdate(
            { transactionId: query.transactionId },
            { status: PAYMENT_STATUS.FAILED },
            { new: true, runValidators: true, session: session })


        await Booking.findByIdAndUpdate(
            updatedPayment?.booking,
            { status: BOOKING_STATUS.FAILED },
            { runValidators: true, session: session }
        )

        await session.commitTransaction()
        session.endSession()
        return { success: true, message: "Payment Fail" }

    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        throw err
    }
}

const cancelPayment = async (query: Record<string, string>) => {
    const session = await Booking.startSession()
    session.startTransaction()
    try {

        const updatedPayment = await Payment.findOneAndUpdate(
            { transactionId: query.transactionId },
            { status: PAYMENT_STATUS.CANCELLED },
            { new: true, runValidators: true, session: session })


        await Booking.findByIdAndUpdate(
            updatedPayment?.booking,
            { status: BOOKING_STATUS.FAILED },
            { runValidators: true, session: session }
        )

        await session.commitTransaction()
        session.endSession()
        return { success: true, message: "Payment Cancel" }

    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        throw err
    }
}

// const successPayment = async (query: Record<string, string>) => {
//     console.log("Success Payment Service Query:", query.transactionId);
//     const session = await Booking.startSession()
//     session.startTransaction()
//     try {

//         const updatedPayment = await Payment.findOneAndUpdate(
//             { transactionId: query.transactionId },
//              {status: PAYMENT_STATUS.PAID}, 
//              { new: true, runValidators: true, session: session })


//         await Booking.findByIdAndUpdate(
//             updatedPayment?.booking,
//             {status: BOOKING_STATUS.COMPLETE},
//             {runValidators: true, session: session }
//         )

//         await session.commitTransaction()
//         session.endSession()
//         return { success: true, message: "Payment Completed Successfully" }

//     } catch (err) {
//         await session.abortTransaction()
//         session.endSession()
//         throw err
//     }
// }





export const PaymentService = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment
}