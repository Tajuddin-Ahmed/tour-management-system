import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { DivisionServices } from "./division.service";
import type { IDivision } from "./division.interface";


const createDivision = catchAsync(async (req: Request, res: Response) => {
    const payload: IDivision = {
        ...req.body,
        thumbnail: req.file?.path
    }
    const result = await DivisionServices.createDivision(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Division created",
        data: result
    })
});

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const result = await DivisionServices.getSingleDivision(slug as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Division retrieved",
        data: result.data
    })
});

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await DivisionServices.getAllDivisions(query as Record<string, string>);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Divisions retrieved",
        data: result.data,
        meta: result.meta
    })
});


const updateDivision = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.id;
    const payload: IDivision = {
        ...req.body,
        thumbnail: req.file?.path
    }
    const result = await DivisionServices.updateDivision(id as string, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Division Updated",
        data: result
    })
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionServices.deleteDivision(req.params.id as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Division deleted",
        data: result
    })
});


export const divisionController = {
    createDivision,
    getSingleDivision,
    getAllDivisions,
    updateDivision,
    deleteDivision
}