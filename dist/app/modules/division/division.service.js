import { deleteImageFromCLoudinary } from "../../config/claudinary.config";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { divisionSearchableFields } from "./division.constant";
import { Division } from "./division.model";
const createDivision = async (payload) => {
    const existingDivision = await Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new Error("A division with this name already exist");
    }
    const division = await Division.create(payload);
    return division;
};
const updateDivision = async (id, payload) => {
    const existingDivision = await Division.findById(id);
    if (!existingDivision) {
        throw new Error("No division found");
    }
    const duplicateDivision = await Division.findOne({ name: payload.name, _id: { $ne: id }, });
    if (duplicateDivision) {
        throw new Error("A division with this name already exist");
    }
    const updatedDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (payload.thumbnail && existingDivision.thumbnail) {
        await deleteImageFromCLoudinary(existingDivision.thumbnail);
    }
    return updatedDivision;
};
const getSingleDivision = async (slug) => {
    const divisions = await Division.findOne({ slug });
    return {
        data: divisions,
    };
};
const getAllDivisions = async (query) => {
    const queryBuilder = new QueryBuilder(Division.find(), query);
    const divisionsData = queryBuilder
        .search(divisionSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = await Promise.all([
        divisionsData.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
};
const deleteDivision = async (id) => {
    await Division.findByIdAndDelete(id);
    return null;
};
export const DivisionServices = {
    createDivision,
    getSingleDivision,
    getAllDivisions,
    updateDivision,
    deleteDivision
};
//# sourceMappingURL=division.service.js.map