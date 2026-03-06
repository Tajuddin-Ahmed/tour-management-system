import * as z from "zod";
import { isActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z
        .string({
            error: (iss) => (iss.input === undefined ? "Name is required" : "Invalid name"),
        })
        .min(2, { error: "Name too short: minimum 2 characters long" })
        .max(50, { error: "Name too long" }),
    email: z
        .email({ error: "Invalid email address format" })
        .min(5, { error: "Minimum 5 characters long" })
        .max(100, { error: "Email cannot be exceed 100 characters" }),
    password: z
        .string({ error: "Password must be string" }).min(8)
        .regex(/^(?=.*[A-Z])/, { error: "Password must contain at least 1 uppercase letter." })
        .regex(/^(?=.*\d)/, { error: "{Password must contain at least 1 digit" })
        .regex(/^(?=.*[!@#$%^&*])/, { error: "Password must contain at least 1 special character" }),
    phone: z.string()
        .regex(/^(?:\+49|0)1[5-7]\d{8,9}$/,
            { error: "Phone number must be valid for Germany. Format : +49XXXXXXXXXXXX or 01XXXXXXXXXXX" })
        .optional(),
    address: z
        .string({ error: "Address must be string" })
        .max(200, {}).optional(),

})

export const updateUserZodSchema = z.object({
    name: z
        .string({
            error: "Name must be string"
        })
        .min(2, { error: "Name too short: minimum 2 characters long" })
        .max(50, { error: "Name too long" })
        .optional(),
    phone: z.string()
        .regex(/^(?:\+49|0)1[5-7]\d{8,9}$/,
            { error: "Phone number must be valid for Germany. Format : +49XXXXXXXXXXXX or 01XXXXXXXXXXX" })
        .optional(),
    address: z
        .string({ error: "Address must be string" })
        .max(200, {})
        .optional(),
    role: z
        .enum(Object.values(Role) as [string])
        .optional(),
    isActive: z
        .enum(Object.values(isActive) as [string])
        .optional(),
    isVerified: z
        .boolean({ error: "IsVarified must be true or false" })
        .optional(),
    isDeleted: z
        .boolean({ error: "isDeleted must be true or false" })
        .optional()

})