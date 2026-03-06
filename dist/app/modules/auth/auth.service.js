/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import { envVars } from "../../config/env";
import { isActive } from "../user/user.interface";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";
// const credentialsLogin = async (payload: Partial<IUser>) => {
//     const { email, password } = payload;
//     if (!email) {
//         throw new Error("Email is required");
//     }
//     const isUserExist = await User.findOne({ email });
//     if (!isUserExist) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Email deos not exist");
//     }
//     const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);
//     if (!isPasswordMatched) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password");
//     }
//     const userTokens = createUserTokens(isUserExist);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password: pass, ...rest } = isUserExist.toObject();
//     return {
//         accessToken: userTokens.accessToken,
//         refreshToken: userTokens.refreshToken,
//         user: rest,
//     }
// }
const getNewAccessToken = async (refreshToken) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
    return {
        accessToken: newAccessToken
    };
};
const resetPassword = async (payload, decodedToken) => {
    if (payload.id != decodedToken.userId) {
        throw new AppError(401, "You cannot reset your password");
    }
    const isUserExist = await User.findById(decodedToken.userId);
    if (!isUserExist) {
        throw new AppError(401, "User does not exist");
    }
    const hashedPassword = await bcryptjs.hash(payload.newPassword, Number(envVars.BCRYPT_SALT_ROUND));
    isUserExist.password = hashedPassword;
    await isUserExist.save();
};
const changePassword = async (oldPassword, newPassword, decodedToken) => {
    const user = await User.findById(decodedToken.userId);
    const isOldPasswordMatched = await bcryptjs.compare(oldPassword, user.password);
    if (!isOldPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old password does not match");
    }
    user.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));
    user.save();
};
const setPassword = async (userId, plainPassword) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(404, "User not found");
    }
    if (user.password && user.auths.some(providerObject => providerObject.provider === "google")) {
        throw new AppError(httpStatus.BAD_REQUEST, "You have already set your password.Now you can change your password from your profile");
    }
    const hashedPassword = await bcryptjs.hash(plainPassword, Number(envVars.BCRYPT_SALT_ROUND));
    const credentialsProvider = {
        provider: "credentials",
        providerId: user.email
    };
    const auths = [...user.auths, credentialsProvider];
    user.password = hashedPassword;
    user.auths = auths;
    user.save();
};
const forgotPassword = async (email) => {
    const isUserExist = await User.findOne({ email });
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
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    };
    const resetToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET, { expiresIn: "10m" });
    const resetUILink = `${envVars.FRONTEND_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`;
    sendEmail({
        to: isUserExist.email,
        subject: "Password Reset",
        templateName: "forgotPassword",
        templateData: {
            name: isUserExist.name,
            resetUILink
        }
    });
};
export const authServices = {
    getNewAccessToken,
    resetPassword,
    changePassword,
    setPassword,
    forgotPassword
};
//# sourceMappingURL=auth.service.js.map