/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { DivisionService } from "./division.service";

const createDivision = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await DivisionService.createDivision(req.body);
     sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Division created successfully",
        data: result
    })
})

const getAllDivisions = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    console.log("this is problem?????")
     const result = await DivisionService.getAllDivisions(req.query as Record<string, string>)
     sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Divisions retrieved successfully",
        data: result
    })
})

const getSingleDivision = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const slug = req.params.slug
    const result = await DivisionService.getSingleDivisions(slug);
     sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Divisions retrieved ",
        data: result
    })
})

const updateDivision = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await DivisionService.updateDivision(req.params.id, req.body);
     sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Division updated successfully",
        data: result,
    })
})

const deleteDivision = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await DivisionService.deleteDivision(req.params.id);
     sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Division deleted successfully",
        data: result,
    })
})



export const DivisionController = {
    createDivision, 
    getAllDivisions,
    updateDivision,
    deleteDivision,
    getSingleDivision
}