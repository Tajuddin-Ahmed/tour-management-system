import type { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {

    const existingDivision = await Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new Error("A division with this name already exist");
    }

    const division = await Division.create(payload);


    return division;

}

const updateDivision = async (id: string, payload: Partial<IDivision>) => {

    const existingDivision = await Division.findById(id);
    if (!existingDivision) {
        throw new Error("No division found");
    }
    const duplicateDivision = await Division.findOne({ name: payload.name as string, _id: { $ne: id }, });
    if (duplicateDivision) {
        throw new Error("A division with this name already exist");
    }

    const updatedDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return updatedDivision;
}

const getSingleDivision = async (slug: string) => {
    const divisions = await Division.findOne({ slug });
    return {
        data: divisions,
    };
}


const getAllDivisions = async () => {

    const divisions = await Division.find({});
    const totalDivisions = await Division.countDocuments();

    return {
        data: divisions,
        meta: {
            total: totalDivisions
        }
    };
}

const deleteDivision = async (id: string) => {
    await Division.findByIdAndDelete(id);
    return null;
}

export const DivisionServices = {
    createDivision,
    getSingleDivision,
    getAllDivisions,
    updateDivision,
    deleteDivision
}