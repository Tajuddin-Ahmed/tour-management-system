export declare const PaymentService: {
    initPayment: (bookingId: string) => Promise<{
        paymentUrl: any;
    }>;
    successPayment: (query: Record<string, string>) => Promise<{
        success: boolean;
        message: string;
    }>;
    failPayment: (query: Record<string, string>) => Promise<{
        success: boolean;
        message: string;
    }>;
    cancelPayment: (query: Record<string, string>) => Promise<{
        success: boolean;
        message: string;
    }>;
    getInvoiceDownloadUrl: (paymentId: string) => Promise<string>;
};
//# sourceMappingURL=payment.service.d.ts.map