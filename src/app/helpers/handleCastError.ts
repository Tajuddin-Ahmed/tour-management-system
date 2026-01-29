/* eslint-disable @typescript-eslint/no-unused-vars */
import type mongoose from "mongoose"
import type { TGenericErrorResponse } from "../interfaces/error.types"

export const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    return {
        statusCode: 400,
        message: "Invalid MongoDb ObjectId. Please provide a valid ID"
    }
}
