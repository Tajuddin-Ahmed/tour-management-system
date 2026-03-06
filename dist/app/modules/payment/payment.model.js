import { model, Schema } from "mongoose";
import { PAYMENT_STATUS } from "./payment.interface";
const paymentSchema = new Schema({
    booking: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
        unique: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: Object.values(PAYMENT_STATUS),
        default: PAYMENT_STATUS.UNPAID
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentGatewayData: {
        type: Schema.Types.Mixed
    },
    invoiceUrl: {
        type: String
    }
}, {
    timestamps: true
});
export const Payment = model("Payment", paymentSchema);
//# sourceMappingURL=payment.model.js.map