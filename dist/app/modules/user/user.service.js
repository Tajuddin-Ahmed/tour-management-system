import AppError from "../../errorHelpers/AppError";
import { Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { userSearchableFields } from "./user.constant";
import { QueryBuilder } from "../../utils/QueryBuilder";
const createUser = async (payload) => {
    const { email, password, ...rest } = payload;
    if (!email) {
        throw new Error("Email is required");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isUserExist = await User.findOne({ email });
    // if (isUserExist) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
    // }
    const hashedPassword = await bcryptjs.hash(password, Number(envVars.BCRYPT_SALT_ROUND));
    const authProvider = { provider: "credentials", providerId: email };
    const user = await User.create({ email, password: hashedPassword, auths: [authProvider], ...rest });
    return user;
};
const updateUser = async (userId, payload, decodedToken) => {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
        if (userId !== decodedToken.userId) {
            throw new AppError(401, "You are not authorized");
        }
    }
    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    if (decodedToken.role === Role.ADMIN && isUserExist.role === Role.SUPER_ADMIN) {
        throw new AppError(401, "You are not authorized");
    }
    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
        // if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
        //     throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        // }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }
    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return newUpdatedUser;
};
const getAllUsers = async (query) => {
    const queryBuilder = new QueryBuilder(User.find(), query);
    const usersData = queryBuilder
        .filter()
        .search(userSearchableFields)
        .sort()
        .fields()
        .paginate();
    const [data, meta] = await Promise.all([
        usersData.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
};
const getSingleUser = async (userId) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user
    };
};
const getMe = async (userId) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user
    };
};
export const userServices = {
    createUser,
    getAllUsers,
    updateUser,
    getMe,
    getSingleUser
};
//# sourceMappingURL=user.service.js.map