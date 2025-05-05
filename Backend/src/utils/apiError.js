class apiError extends Error {
    constructor(
        statuscode,
        message = "something went wrong",
        stack = "",
        error = []
    ) {
        super(message);
        this.statuscode = statuscode;
        this.message = message;
        this.stack = stack;
        this.error = error;
        this.success = false;
        this.data = null;

        if (stack) {
            this.stack = stack;
        } else Error.captureStackTrace(this, this.constructor);
    }
}

export {apiError}