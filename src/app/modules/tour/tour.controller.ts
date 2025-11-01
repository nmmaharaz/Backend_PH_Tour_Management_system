/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TourService } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"



/**------------------------------Tour----------------------- */

const createTour = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const result = await TourService.createTour(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tour type created successfully.",
        data: result,
    })
})

const getAllTour = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const result = await TourService.getAllTour(req.query as Record<string, string>)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tour type created successfully.",
        data: result.data,
        meta: result.meta
    })
})

const updateTour = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const id = await req.params.id
    const result = await TourService.updateTour(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tour type created successfully.",
        data: result,
    })
})



/**---------------------------------Tour type--------------------------------------- */

const createTourType = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    
    const result = await TourService.createTourType(req.body)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tour type created successfully.",
        data: result,
    })
})

const getAllTourType = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    
    const result = await TourService.getAllTourType()
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tour type created successfully.",
        data: result,
    })
})

const updateTourType = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const id = req.params.id
    const result = await TourService.updateTourType(id, req.body)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tour type updated successfully.",
        data: result,
    })
})

const deleteTourType = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const id = req.params.id
    const result = await TourService.deleteTourType(id)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tour type deleted successfully.",
        data: result,
    })
})




export const TourController ={
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
    createTour,
    getAllTour,
    updateTour
}