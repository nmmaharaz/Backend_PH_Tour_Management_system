/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes"
import { UserSevices } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserSevices.createUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Created Successfully",
        data: user
    })
})
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const verifiedToken = req.user
    const payload = await req.body;
    const user = await UserSevices.updateUser(id, payload, verifiedToken as JwtPayload)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Created Successfully",
        data: user
    })
})


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserSevices.getAllUsers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        meta: users.meta,
        data: users.users
    })
})


export const UserController = {
    createUser,
    updateUser,
    getAllUsers
}