import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/AppError"
import { verifyToken } from "../utils/jwt"
import { envVers } from "../config/env"
import { JwtPayload } from "jsonwebtoken"
import { User } from "../modules/user/user.model"
import { IsActive } from "../modules/user/user.interface"
import httpStatus from "http-status-codes"

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization

        console.log(accessToken, "accessToken");

        if (!accessToken) {
            throw new AppError(403, "No token provided")
        }

        const varifiedToken = verifyToken(accessToken, envVers.JWT_ACCESS_SECRET) as JwtPayload
        
        const isUserExist = await User.findOne({ email: varifiedToken.email });

        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
        }
        if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`);
        }
        if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is deleted`);
        }

        req.user = varifiedToken

        if (!authRoles.includes(varifiedToken.role)) {
            throw new AppError(403, "You are not authorized to access this route")
        }

        next()
    } catch (err) {
        next(err)
    }
}
