import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import validateRequest from "../../middlewares/validateRequest";
import { createTourZodSchema, tourTypeZodSchema, updateTourZodSchema } from "./tour.validation";
import { TourController } from "./tour.controller";

const router = Router()

/**-------------------Tour Type Route -------------------------*/
router.post("/create-tour-type", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(tourTypeZodSchema), TourController.createTourType)

router.get("/tour-types", TourController.getAllTourType)

router.patch("/tour-types/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(tourTypeZodSchema), TourController.updateTourType)

router.delete("/tour-types/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(tourTypeZodSchema), TourController.deleteTourType)

/**-------------------Tour Route -------------------------*/

router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createTourZodSchema), TourController.createTour)

router.get("/", TourController.getAllTour)

router.patch("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(updateTourZodSchema), TourController.updateTour)



export const TourRoutes = router