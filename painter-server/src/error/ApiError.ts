class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status
    }

    static badRequest(message: string): ApiError {
        return new ApiError(message, 400)
    }

    static internalError(message: string): ApiError {
        return new ApiError(message, 500)
    }

    static forbiddenError(message: string): ApiError {
        return new ApiError(message, 403)
    }
}

export default ApiError;