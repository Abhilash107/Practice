class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = []
    )
    {
        super(message)
        this.statusCode = statusCode;
        this.data = null;// null data
        this.success = false;// success status false
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor)
    }
}

export { ApiError }