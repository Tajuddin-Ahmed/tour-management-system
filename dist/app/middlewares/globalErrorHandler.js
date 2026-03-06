import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handleZodError } from "../helpers/handleZodError";
import { handleValidationError } from "../helpers/handleValidationError";
import { deleteImageFromCLoudinary } from "../config/claudinary.config";
export const globalErrorHandler = async (err, req, res, next) => {
    if (envVars.NODE_ENV === "development") {
        console.log(err);
    }
    if (req.file) {
        await deleteImageFromCLoudinary(req.file.path);
    }
    if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrls = req.files.map(file => file.path);
        await Promise.all(imageUrls.map(url => deleteImageFromCLoudinary(url)));
    }
    let statusCode = 500;
    let message = `Something Went Wrong!`;
    let errorSources = [];
    if (err.code === 11000) {
        const simplifiedError = handlerDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.name === "CastError") {
        const handleSiplifiedCastError = handleCastError(err);
        statusCode = handleSiplifiedCastError.statusCode;
        message = handleSiplifiedCastError.message;
    }
    else if (err.name === "ZodError") {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources;
        message = simplifiedError.message;
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    });
};
//# sourceMappingURL=globalErrorHandler.js.map