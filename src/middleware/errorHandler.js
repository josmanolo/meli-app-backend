export const errorHandler = (errorObject, req, res, next) => {
    const { message, status, error } = errorObject;

    const errorResponse = {
        success: false,
        message: message || "Internal server error",
        status: status || 500,
        error,
    };

    res.status(errorResponse.status).json(errorResponse);
};
