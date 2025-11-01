import { tourSecarchableFields } from "../../contants";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";



/**------------------------Tour---------------------- */
const createTour = async (payload: ITour) => {
    const existingTitle = await Tour.findOne({ title: payload.title })

    if (existingTitle) {
        throw new Error("A tour with this title already exists.")
    }

    const baseSlug = payload.title.toLowerCase().split(" ").join("-")
    const createSlug = `${baseSlug}`
    let slug = createSlug

    let counter = 0
    while (await Tour.exists({ slug })) {
        slug = `${createSlug}-${counter++}`
    }

    payload.slug = slug as string

    const result = await Tour.create(payload);
    return result
}

const getAllTour = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Tour.find(), query);

    const tours = await queryBuilder
        .search(tourSecarchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    const [data, meta] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ]) 

    return {
        data,
        meta
    }
}

const updateTour = async (id: string, payload: ITour) => {
    const existingTour = await Tour.findById(id)
    if (!existingTour) {
        throw new Error("Tour not found.")
    }
    const result = await Tour.findByIdAndUpdate(id, payload, { new: true })
    return result
}


/**---------------------------------Tour Type----------------------- */
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

const updateTourType = async (id: string, payload: ITourType) => {
    const existingDivision = await TourType.findById(id)
    if (!existingDivision) {
        throw new Error("Tour type not found.")
    }

    const duplicateDivision = await TourType.findOne({
        name: payload.name,
        _id: { $ne: id }
    })
    if (duplicateDivision) {
        throw new Error("A tour type with this name already exists.")
    }

    const result = await TourType.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return result
}

const deleteTourType = async (id: string) => {
    const result = await TourType.findByIdAndDelete(id)
    return result
}


export const TourService = {
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
    createTour,
    getAllTour,
    updateTour
}