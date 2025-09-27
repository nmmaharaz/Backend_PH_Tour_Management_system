import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes"
import { User } from "../user/user.model";
import bcrypt from "bcryptjs"
import { generateToken } from "../../utils/jwt";
import { envVers } from "../../config/env";

const credientialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const accessToken = generateToken(jwtPayload, envVers.JWT_ACCESS_SECRET, envVers.JWT_ACCESS_EXPIRES)

    return {
        accessToken
    };

}

export const AuthServices = {
    credientialsLogin
}