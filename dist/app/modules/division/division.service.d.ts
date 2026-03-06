import type { IDivision } from "./division.interface";
export declare const DivisionServices: {
    createDivision: (payload: IDivision) => Promise<import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getSingleDivision: (slug: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null;
    }>;
    getAllDivisions: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    updateDivision: (id: string, payload: Partial<IDivision>) => Promise<(import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteDivision: (id: string) => Promise<null>;
};
//# sourceMappingURL=division.service.d.ts.map