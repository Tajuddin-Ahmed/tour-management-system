import httpStatus from 'http-status-codes';
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
const createUser = catchAsync(async (req, res, next) => {
    const user = await userServices.createUser(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: user
    });
});
const updateUser = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const decodedToken = req.user;
    const payload = req.body;
    const user = await userServices.updateUser(userId, payload, decodedToken);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated successfully",
        data: user
    });
});
const getAllUsers = catchAsync(async (req, res, next) => {
    const query = req.query;
    const result = await userServices.getAllUsers(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All users retrieved successfully",
        data: result.data,
        meta: result.meta
    });
});
const getMe = catchAsync(async (req, res, next) => {
    const decodedToken = req.user;
    const result = await userServices.getMe(decodedToken.userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My profile retrieved successfully",
        data: result.data,
    });
});
export const usersController = {
    createUser,
    getAllUsers,
    updateUser,
    getMe
};
//# sourceMappingURL=user.controller.js.map