import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserTokens } from "../../utils/userTokens";
import { envVars } from "../../config/env";
import passport from "passport";
const credentialsLogin = catchAsync(async (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
        if (err) {
            return next(new AppError(401, err));
        }
        if (!user) {
            return next(new AppError(401, err));
        }
        const userTokens = await createUserTokens(user);
        // delete user.toObject().password;
        const { password: pass, ...rest } = user.toObject();
        setAuthCookie(res, userTokens);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Login successful",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest
            }
        });
    })(req, res, next);
});
const getNewAccessToken = catchAsync(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No Refresh Token Received");
    }
    const tokenInfo = await authServices.getNewAccessToken(refreshToken);
    setAuthCookie(res, tokenInfo);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token creation successful",
        data: tokenInfo
    });
});
const logout = catchAsync(async (req, res, next) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Logged out successfully",
        data: null
    });
});
const resetPassword = catchAsync(async (req, res, next) => {
    const decodedToken = req.user;
    await authServices.resetPassword(req.body, decodedToken);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password reset successfull",
        data: null
    });
});
const setPassword = catchAsync(async (req, res, next) => {
    const decodedToken = req.user;
    const { password } = req.body;
    await authServices.setPassword(decodedToken.userId, password);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password has been set successfully",
        data: null
    });
});
const forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    await authServices.forgotPassword(email);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Email sent successfully",
        data: null
    });
});
const changePassword = catchAsync(async (req, res, next) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user;
    await authServices.changePassword(oldPassword, newPassword, decodedToken);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed successfull",
        data: null
    });
});
const googleCallbackController = catchAsync(async (req, res, next) => {
    let redirectTo = req.query.state ? req.query.state : "";
    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }
    const user = req.user;
    console.log("user", user);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }
    const tokenInfo = createUserTokens(user);
    setAuthCookie(res, tokenInfo);
    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
});
export const authControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    changePassword,
    setPassword,
    googleCallbackController,
    forgotPassword
};
//# sourceMappingURL=auth.controller.js.map