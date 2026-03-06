import type { JwtPayload } from "jsonwebtoken";
export declare const authServices: {
    getNewAccessToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
    resetPassword: (payload: Record<string, any>, decodedToken: JwtPayload) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => Promise<void>;
    setPassword: (userId: string, plainPassword: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
};
//# sourceMappingURL=auth.service.d.ts.map