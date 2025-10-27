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
        message: "Division created",
        data: result
    })
})

const getAllDivisions = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await DivisionService.getAllDivisions();
     sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Divisions retrieved",
        data: result.data,
        meta: {
            total: result.total
        }
    })
})

const updateDivision = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await DivisionService.updateDivision(req.params.id, req.body);
     sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Division updated",
        data: result,
    })
})

const deleteDivision = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await DivisionService.deleteDivision(req.params.id);
     sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Division deleted",
        data: result,
    })
})



export const DivisionController = {
    createDivision, 
    getAllDivisions,
    updateDivision,
    deleteDivision
}