import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"

const createUser = async (payload: Partial<IUser>) => {
    const {email, ...rest } = payload;
    const isUserExist = await User.findOne({email});
    if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "User already exists")
    }

    const authProvider:IAuthProvider = {
        provider: "credentials", 
        providerId: email as string
    }

    const user = await User.create({email, auths:[authProvider], ...rest });
    return user;
}

const getAllUsers = async () =>{
    const users = await User.find({})
    const total =  await User.countDocuments()
    return {users, meta: {
        total
    }};
}



export const UserSevices = {
    createUser,
    getAllUsers
}