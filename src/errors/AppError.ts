export default class AppError extends Error {
    public otherMessage?: any;
    public statusCode: number;

    constructor(message: string, statusCode?: number, otherMessage?: unknown) {
        super(message);
        this.otherMessage = otherMessage;
        this.statusCode = statusCode || 400;
    }
}