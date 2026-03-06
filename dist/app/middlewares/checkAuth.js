import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import httpStatus from "http-status-codes";
import { User } from "../modules/user/user.model";
import { isActive } from "../modules/user/user.interface";
export const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError(403, "No Token Received");
        }
        const decodedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);
        const isUserExist = await User.findOne({ email: decodedToken.email });
        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User deos not exist");
        }
        if (!isUserExist.isVerified) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
        }
        if (isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`);
        }
        if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted");
        }
        if (!authRoles.includes(decodedToken.role)) {
            throw new AppError(403, "You are not permitted to view this Route");
        }
        req.user = decodedToken;
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=checkAuth.js.map