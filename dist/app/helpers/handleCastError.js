export const handleCastError = (err) => {
    return {
        statusCode: 400,
        message: "Invalid MongoDb ObjectId. Please provide a valid ID"
    };
};
//# sourceMappingURL=handleCastError.js.map