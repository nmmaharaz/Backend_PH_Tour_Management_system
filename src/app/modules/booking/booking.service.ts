import AppError from "../../errorHelpers/AppError"
import { PAYMENT_STATUS } from "../payment/payment.interface"
import { Payment } from "../payment/payment.model"
import { Tour } from "../tour/tour.model"
import { User } from "../user/user.model"
import { BOOKING_STATUS, IBooking } from "./booking.interface"
import { Booking } from "./booking.model"
import httpStatus from "http-status-codes"


const getTransactionId = () =>{
    return `tram_${Date.now()}_${Math.floor(Math.random()*1000)}`
}

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const transactionId = getTransactionId()

    const user = await User.findById({ _id: userId })

    if(!user?.phone || !user.address){
        throw new AppError(httpStatus.BAD_REQUEST, "Please Update Your Profile to Book a Tour")
    }

    const booking = await Booking.create({
        user: userId,
        status: BOOKING_STATUS.PENDING,
        ...payload
    })

    const tour = await Tour.findById({_id: payload.tour}).select("costFrom")
    if(!tour){
        throw new AppError (httpStatus.BAD_REQUEST, "No Tour Cost Found")
    }

    const amount = Number(tour.costFrom) * Number(payload.guestCount) 

    const payment = await Payment.create({
        booking: booking._id,
        transactionId, 
        status: PAYMENT_STATUS.UNPAID,
        amount
    })

    const updateBooking = await Booking.findByIdAndUpdate(
        booking._id, {payment: payment._id}, {new: true, runValidators: true}
    )


    return updateBooking
}
const getAllBooking = async () => {
    return payload
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