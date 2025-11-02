import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router()

router.post("/init-payment/:bookingId", checkAuth(...Object.values(Role)), PaymentController.initPayment)
router.post("/success",
    // checkAuth(...Object.values(Role)),
     PaymentController.successPayment)
router.post("/fail", PaymentController.failPayment)
router.post("/cancel", PaymentController.cancelPayment)


const PaymentRoutes = router;
export default PaymentRoutes