class apiError extends Error {
    constructor(
        massage = "something went wrong",
        stack = "",
        statuscode = "500",
        error = []
    ) {
        super(massage);
        this.message = massage;
        this.stack = stack;
        this.statuscode = statuscode;
        this.error = error;
        this.success = false;
        this.data = null;

        if (stack) {
            this.stack = stack;
        } else Error.captureStackTrace(this, this.constructor);
    }
}
