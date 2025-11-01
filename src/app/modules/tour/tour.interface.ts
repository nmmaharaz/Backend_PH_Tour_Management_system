import { Types } from "mongoose";

export interface ITourType {
    name: string;
}

export interface ITour {
    title: string;
    slug: string;
    description?: string;
    image?: string[];
    location?: string;
    costFrom?: number;
    startDate?: Date;
    departureLocation?: string;
    arrivalLocation?: string;
    endDate?: Date;
    included?: string[];
    excluded?: string[];
    amenities?: string[];
    tourPlan?: string[];
    minAge?: number;
    division: Types.ObjectId;
    tourType: Types.ObjectId;
}