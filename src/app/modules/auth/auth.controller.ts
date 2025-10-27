/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { createUserTokens } from "../../utils/userTokens";
import { envVers } from "../../config/env";
import passport from "passport";
// import passport from "passport";

const credientialsLogin = async (req: Request, res: Response, next: NextFunction) => {
    // const loginInfo = await AuthServices.credientialsLogin(req.body)
    console.log("Initiating local authentication");
    passport.authenticate("local", async (err: any, user: any, info: any) => {
        console.log("Local authentication callback invoked");
        if (err) {
            return next(err);
        }

        // 🔄 Changed: handled case when user not found properly
        // আগে এখানে return next(err) ছিল, কিন্তু err null হলে unauthorized error রিটার্ন করাই ঠিক
        if (!user) {
            return next(new AppError(httpStatus.UNAUTHORIZED, info?.message || "Invalid credentials"));
        }

        const userTokens = createUserTokens(user)


        setAuthCookie(res, userTokens)

        delete user.password;

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User Created Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user
            }
        })
    })(req, res, next);

}
const getNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)

    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo
    })
}
const logout = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Logged Out Successfully",
        data: null
    })
}
const resetPassword = async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;


    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Changed Successfully",
        data: null
    })
}
const googleCallbackController = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    let redirectTo = req.query.state ? req.query.state as string : "/";

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }


    console.log("Google User:", user);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }

    const tokenInfo = createUserTokens(user)
    setAuthCookie(res, tokenInfo)
    res.redirect(`${envVers.FRONTEND_URL}/${redirectTo}`);
    console.log("Redirecting to frontend:", envVers.FRONTEND_URL);
}

export const AuthControllers = {
    credientialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
}