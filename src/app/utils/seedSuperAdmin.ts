import { envVers } from "../config/env"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model"
import bcript from "bcryptjs"
export const seedSuperAdmin = async() =>{
    try{
        const isSuperAdminExist = await User.findOne({email: envVers.SUPER_ADMIN_EMAIL});
        if(isSuperAdminExist){
            return console.log("Super Admin already exists");
        }

        const hashPassword = await bcript.hash(envVers.SUPER_ADMIN_PASSWORD, Number(envVers.BCRYPT_SALT_ROUND))


        const authProvider:IAuthProvider = {
            provider: "credentials",
            providerId: envVers.SUPER_ADMIN_EMAIL
        }

        const payload:IUser = {
            name: "Super Admin",
            email: envVers.SUPER_ADMIN_EMAIL,
            password: hashPassword,
            role: Role.SUPER_ADMIN,
            auths:[authProvider]
        }

        await User.create(payload)
        console.log("Super Admin created successfully");
    }catch(err){
        console.log(err)
    }
}