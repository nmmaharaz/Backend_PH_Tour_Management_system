/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes"
import { User } from "../user/user.model";
import bcrypt from "bcryptjs"
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

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

    const userTokens = createUserTokens(isUserExist);

    const { password: pass, ...rest } = isUserExist.toObject();

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    };

}
const getNewAccessToken = async (refreshToken: string) => {
    const newAcceessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
    return {
        accessToken: newAcceessToken
    };

}
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)

    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user?.password as string)

    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect")
    }

    user.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));

    await user.save()

}

export const AuthServices = {
    credientialsLogin,
    getNewAccessToken,
    resetPassword
}