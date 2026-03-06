export const handlerDuplicateError = (err) => {
    const matchedArry = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${matchedArry[1]} already exist`
    };
};
//# sourceMappingURL=handleDuplicateError.js.map