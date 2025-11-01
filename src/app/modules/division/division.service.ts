import { divisionSecarchableFields} from "../../contants";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";



const createDivision = async (payload: IDivision) => {
    const existingDivision = await Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new Error("A division with this name already exists");
    }

    // const baseSlug = payload.name.toLowerCase().split(" ").join("-")
    // const createSlug = `${baseSlug}-division`
    // let slug = createSlug

    // let counter = 0
    // while (await Division.exists({ slug })) {
    //     slug = `${createSlug}-${counter++}`
    // }

    // payload.slug = slug as string

    const division = await Division.create(payload);
    return division;
}



const getAllDivisions = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Division.find(), query)

    const divisions = await queryBuilder
        .search(divisionSecarchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    const [data, meta] = await Promise.all([
        divisions.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
}

const getSingleDivisions = async (slug: string) => {
    const result = await Division.findOne({slug})
    return result
}

const updateDivision = async (id: string, payload: Partial<IDivision>) => {

    const existingDivision = await Division.findById(id);

    if (!existingDivision) {
        throw new Error("Division not found.")
    }

    const duplicateDivision = await Division.findOne({
        name: payload.name,
        _id: { $ne: id }
    })

    if (duplicateDivision) {
        throw new Error("A division with this name already exists.")
    }

    const result = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

    return result
}


const deleteDivision = async (id: string) => {
    await Division.findByIdAndDelete(id)

    return null
}


export const DivisionService = {
    createDivision,
    getAllDivisions,
    updateDivision,
    deleteDivision,
    getSingleDivisions
}