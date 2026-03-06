import { model, Schema } from "mongoose";
import { isActive, Role } from "./user.interface";
const authProviderSchema = new Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    versionKey: false,
    _id: false
});
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: {
        type: String,
        enum: Object.values(isActive),
        default: isActive.ACTIVE
    },
    isVerified: { type: Boolean, default: false },
    auths: [authProviderSchema]
}, {
    timestamps: true,
    versionKey: false
});
export const User = model("User", userSchema);
//# sourceMappingURL=user.model.js.map