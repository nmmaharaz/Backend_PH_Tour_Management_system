import { Router } from "express";
import { BookingController } from "./booking.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { createBookingZodSchema, updateBookingZodSchema } from "./booking.validataion";

const router = Router()

// router.post("/",checkAuth(...Object.values(Role)), validateRequest(createBookingZodSchema),
// BookingController.createBooking)
router.post("/",
    checkAuth(...Object.values(Role)),
    validateRequest(createBookingZodSchema),
    BookingController.createBooking
);

router.get("/",checkAuth(Role.ADMIN, Role.SUPER_ADMIN),BookingController.getAllBooking)

router.get("/my-bookings",checkAuth(...Object.values(Role)),BookingController.getAllBooking)

router.get("/:bookingId",checkAuth(...Object.values(Role)),BookingController.getAllBooking)

router.patch("/:bookingId/status",checkAuth(...Object.values(Role)),
validateRequest(updateBookingZodSchema),BookingController.updateBooking)

router.delete("/:bookingId",checkAuth(...Object.values(Role)),BookingController.updateBooking)




const BookingRoutes = router

export default BookingRoutes