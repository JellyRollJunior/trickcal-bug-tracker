class BaseError extends Error {
    status: number;
    
    constructor(name: string = 'Internal server error', message = 'Error processing request', status = 500) {
        super(message);
        this.name = name;
        this.status = status;
    }
}

export { BaseError };
