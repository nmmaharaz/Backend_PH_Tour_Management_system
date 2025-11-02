/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError"
import { ISSLCommerz } from "../../sslCommerz/sslCommerz.interface"
import { SSLService } from "../../sslCommerz/sslCommerz.service"
import { PAYMENT_STATUS } from "../payment/payment.interface"
import { Payment } from "../payment/payment.model"
import { Tour } from "../tour/tour.model"
import { User } from "../user/user.model"
import { BOOKING_STATUS, IBooking } from "./booking.interface"
import { Booking } from "./booking.model"
import httpStatus from "http-status-codes"


const getTransactionId = () => {
    return `tram_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const session = await Booking.startSession()
    session.startTransaction()
    try {
        const transactionId = getTransactionId()

        const user = await User.findById({ _id: userId })

        if (!user?.phone || !user.address) {
            throw new AppError(httpStatus.BAD_REQUEST, "Please Update Your Profile to Book a Tour")
        }

        const booking = await Booking.create([{
            user: userId,
            status: BOOKING_STATUS.PENDING,
            ...payload
        }], { session })

        const tour = await Tour.findById({ _id: payload.tour }).select("costFrom")
        
        if (!tour) {
            throw new AppError(httpStatus.BAD_REQUEST, "No Tour Cost Found")
        }

        const amount = Number(tour.costFrom) * Number(payload.guestCount)

        const payment = await Payment.create([{
            booking: booking[0]._id,
            transactionId,
            status: PAYMENT_STATUS.UNPAID,
            amount
        }], { session })

        const updateBooking = await Booking
            .findByIdAndUpdate(
                booking[0]._id,
                { payment: payment[0]._id },
                { new: true, runValidators: true, session },
            )
            .populate("user", "name email phone address")
            .populate("tour", "title costFrom")
            .populate("payment")

        const name = (updateBooking?.user as any).name
        const email = (updateBooking?.user as any).email
        const phone = (updateBooking?.user as any).phone
        const address = (updateBooking?.user as any).address

        const sslPayload: ISSLCommerz = {
            amount,
            transactionId,
            name,
            email,
            phone,
            address
        }

        const sslPayment = await SSLService.sslPaymentInit(sslPayload)

        await session.commitTransaction()
        session.endSession()

        return {
            payment: sslPayment.GatewayPageURL,
            booking: updateBooking
        }
    } catch (error) {
        session.abortTransaction()
        session.endSession()
        throw error
    }
}
const getAllBooking = async () => {
    return {}
}
const updateBooking = async (payload: IBooking) => {
    return payload
}
const deleteBooking = async (payload: IBooking) => {
    return payload
}






export const BookingService = {
    createBooking,
    getAllBooking,
    updateBooking,
    deleteBooking
}