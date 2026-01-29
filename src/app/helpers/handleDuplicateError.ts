/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TGenericErrorResponse } from "../interfaces/error.types";

export const handlerDuplicateError = (err: any): TGenericErrorResponse => {
    const matchedArry = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${matchedArry[1]} already exist`
    }
}