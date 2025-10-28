import { ITourType } from "./tour.interface";
import { TourType } from "./tour.model";

const createTourType = async (payload: ITourType) => {
    const existingTourType = await TourType.findOne({ name: payload.name })
    if (existingTourType) {
        throw new Error("Tour type already exists.")
    }

    const result = await TourType.create(payload)

    return result
}

const getAllTourType = async () => {
    const result = await TourType.find({})

    return result
}


export const TourService = {
    createTourType,
    getAllTourType
}