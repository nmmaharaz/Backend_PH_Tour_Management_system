import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/AppError"
import { verifyToken } from "../utils/jwt"
import { envVers } from "../config/env"
import { JwtPayload } from "jsonwebtoken"

export const checkAuth = (...authRoles :string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken  = req.headers.authorization

        console.log(accessToken,"accessToken");

        if (!accessToken) {
            throw new AppError(403, "No token provided")
        }

        const varifiedToken = verifyToken(accessToken, envVers.JWT_ACCESS_SECRET) as JwtPayload

        console.log(varifiedToken);

        req.user = varifiedToken

        if(!authRoles.includes(varifiedToken.role)){
            throw new AppError(403, "You are not authorized to access this route")
        }

        next()
    } catch (err) {
        next(err)
    }
}
