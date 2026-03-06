import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { DivisionServices } from "./division.service";
const createDivision = catchAsync(async (req, res) => {
    const payload = {
        ...req.body,
        thumbnail: req.file?.path
    };
    const result = await DivisionServices.createDivision(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Division created",
        data: result
    });
});
const getSingleDivision = catchAsync(async (req, res) => {
    const slug = req.params.slug;
    const result = await DivisionServices.getSingleDivision(slug);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Division retrieved",
        data: result.data
    });
});
const getAllDivisions = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await DivisionServices.getAllDivisions(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Divisions retrieved",
        data: result.data,
        meta: result.meta
    });
});
const updateDivision = catchAsync(async (req, res) => {
    const id = req.params.id;
    const payload = {
        ...req.body,
        thumbnail: req.file?.path
    };
    const result = await DivisionServices.updateDivision(id, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Division Updated",
        data: result
    });
});
const deleteDivision = catchAsync(async (req, res) => {
    const result = await DivisionServices.deleteDivision(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Division deleted",
        data: result
    });
});
export const divisionController = {
    createDivision,
    getSingleDivision,
    getAllDivisions,
    updateDivision,
    deleteDivision
};
//# sourceMappingURL=division.controller.js.map