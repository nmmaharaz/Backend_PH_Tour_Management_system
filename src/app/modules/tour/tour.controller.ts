/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TourService } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"



const createTourType = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    
    const result = await TourService.createTourType(req.body)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tour type created.",
        data: result,
    })
})

const getAllTourType = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    
    const result = await TourService.getAllTourType()
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tour type created.",
        data: result,
    })
})




export const TourController ={
    createTourType,
    getAllTourType
}