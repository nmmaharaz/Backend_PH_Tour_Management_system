import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcript from "bcryptjs"
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSecarchableFields } from "../../contants";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;
    
    // Duplicate user check as it is handled in global error handler now 
    // const isUserExist = await User.findOne({ email });
    // if (isUserExist) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User already exists")
    // }

    const hashPassword = await bcript.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));

    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: email as string
    }

    const user = await User.create({ email, password: hashPassword, auths: [authProvider], ...rest });

    return user;
}

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const isUserExist = await User.findById(userId);

    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }

    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
        if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
        if (payload.isDeleted || payload.isActive || payload.isVerified) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
    }

    if (payload.password) {
        payload.password = await bcript.hash(payload.password, Number(envVars.BCRYPT_SALT_ROUND))
    }

    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true
    })
    return newUpdateUser
}

const getAllUsers = async (query: Record<string, string>) => {
    // const users = await User.find({})
    // const total = await User.countDocuments()
    // return {
    //     users, meta: {
    //         total
    //     }
    // };
     const queryBuilder = new QueryBuilder(User.find(), query)
    
        const divisions = await queryBuilder
            .search(userSecarchableFields)
            .filter()
            .sort()
            .fields()
            .paginate()
    
        const [data, meta] = await Promise.all([
            divisions.build(),
            queryBuilder.getMeta()
        ])
    
        return {
            data,
            meta
        }
}


export const UserSevices = {
    createUser,
    updateUser,
    getAllUsers
}