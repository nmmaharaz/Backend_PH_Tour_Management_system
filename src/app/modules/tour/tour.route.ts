import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import validateRequest from "../../middlewares/validateRequest";
import { tourTypeZodSchema } from "./tour.validation";
import { TourController } from "./tour.controller";

const router = Router()

router.post("/create-tour-type", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(tourTypeZodSchema), TourController.createTourType)

router.get("/tour-types", TourController.getAllTourType)


export const TourRoutes = router