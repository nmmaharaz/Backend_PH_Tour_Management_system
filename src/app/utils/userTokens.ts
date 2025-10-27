import { JwtPayload } from "jsonwebtoken";
import { envVers } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { IsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import httpStatus from "http-status-codes";

export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = generateToken(jwtPayload, envVers.JWT_ACCESS_SECRET, envVers.JWT_ACCESS_EXPIRES)

    const refreshToken = generateToken(jwtPayload, envVers.JWT_REFRESH_SECRET, envVers.JWT_REFRESH_EXPIRES)

    return {
        accessToken,
        refreshToken
    }
}


export const createNewAccessTokenWithRefreshToken =async (refreshToken: string) =>{
     const verifiedRefreshToken = verifyToken(refreshToken, envVers.JWT_REFRESH_SECRET) as JwtPayload
    
        const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });
    
        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
        }
        if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`);
        }
        if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is deleted`);
        }
    
        const jwtPayload = {
            userId: isUserExist._id,
            email: isUserExist.email,
            role: isUserExist.role
        }
    
        const accessToken = generateToken(jwtPayload, envVers.JWT_ACCESS_SECRET, envVers.JWT_ACCESS_EXPIRES)
        return accessToken;
}