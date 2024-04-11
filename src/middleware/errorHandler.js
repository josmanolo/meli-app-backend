export const errorHandler = (error, req, res, next) => {
    const { response, request, message, status } = error;

    let errorResponse = {
        success: false,
        message: "Internal server error",
        status: 500,
    };

    if (response) {
        errorResponse.status = response.status;
        errorResponse.message = message;
    } else if (request) {
        errorResponse.status = 503;
        errorResponse.message = "Connection Error";
    } else if (status) {
        errorResponse.status = status;
        errorResponse.message = message || errorResponse.message;
    }

    res.status(errorResponse.status).json(errorResponse);
};
