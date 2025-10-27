import { Types } from "mongoose";

export interface ITourType{
    name: string;
}

export interface ITour {
    title: string;
    slug: string;
    descriptio?: string;
    image?: string[];
    location?: string;
    costFrom?: number;
    startDate?: Date;
    endDate?: Date;
    included?: string[];
    excluded?: string[];
    amenities?: string[];
    tourPlan?: string[];
    minAge?: number;
    division: Types.ObjectId;
    tourType: Types.ObjectId;
}