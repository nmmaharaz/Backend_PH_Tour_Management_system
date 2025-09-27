import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z.string({ error: "Name must be string" }).min(2, "Name must be at least 2 characters long").max(50, "Name must be less than 50 characters long"),
    email: z.string({ error: "Email must be string" }).email("Invalid email address").min(5, "Email must be at least 5 characters long").max(100, "Email must be less than 50 characters long"),
    password: z.string({
        error: "Password must be a string"
    })
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }).optional(),

    phone: z.string({
        error: "Phone must be a string"
    })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be a valid Bangladeshi phone number"
        }).optional(),
    address: z.string({
        error: "Address must be a string"
    }).max(200, {
        message: "Address must be at most 200 characters long"
    }).optional()
})




export const updateUserZodSchema = z.object({
    name: z.string({ error: "Name must be string" }).min(2, "Name must be at least 2 characters long").max(50, "Name must be less than 50 characters long").optional(),
    password: z.string({
        error: "Password must be a string"
    })
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }).optional(),

    phone: z.string({
        error: "Phone must be a string"
    })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be a valid Bangladeshi phone number"
        }).optional(),
    address: z.string({
        error: "Address must be a string"
    }).max(200, {
        message: "Address must be at most 200 characters long"
    }).optional(),
    isDeleted: z.boolean("isDeleted must be true or false").optional(),
    isActive: z.enum(Object.values(IsActive)).optional(),
    isVerified: z.boolean("isVerified must be true or false").optional(),
    role: z.enum(Object.values(Role)).optional()
})