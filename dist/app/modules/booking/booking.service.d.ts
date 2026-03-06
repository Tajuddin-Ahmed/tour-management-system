import { type IBooking } from "./booking.interface";
export declare const BookingService: {
    createBooking: (payload: Partial<IBooking>, userId: string) => Promise<{
        paymentUrl: any;
        booking: (import("mongoose").Document<unknown, {}, IBooking, {}, import("mongoose").DefaultSchemaOptions> & IBooking & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null;
    }>;
    getUserBookings: () => Promise<{}>;
    getBookingById: () => Promise<{}>;
    updateBookingStatus: () => Promise<{}>;
    getAllBookings: () => Promise<{}>;
};
//# sourceMappingURL=booking.service.d.ts.map