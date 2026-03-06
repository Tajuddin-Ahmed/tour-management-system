export const validateRequest = (zodSchema) => async (req, res, next) => {
    try {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        req.body = await zodSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=validateRequest.js.map