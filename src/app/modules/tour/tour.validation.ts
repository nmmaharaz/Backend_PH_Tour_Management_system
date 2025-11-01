import z from "zod";

export const tourTypeZodSchema = z.object({
    name: z.string()
})

export const createTourZodSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.array(z.string()).optional(),
    location: z.string().optional(),
    costFrom: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    tourPlan: z.array(z.string()).optional(),
    minAge: z.number().optional(),
    division: z.string(),
    tourType: z.string(),
    departureLocation: z.string().optional(),
    arrivalLocation: z.string().optional()
})

export const updateTourZodSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.array(z.string()).optional(),
    location: z.string().optional(),
    costFrom: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    tourPlan: z.array(z.string()).optional(),
    minAge: z.number().optional(),
    division: z.string().optional(),
    tourType: z.string().optional(),
    departureLocation: z.string().optional(),
    arrivalLocation: z.string().optional()
})