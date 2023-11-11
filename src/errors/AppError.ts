export default class AppError extends Error {
    public otherMessage?: unknown;
    public statusCode: number;

    constructor(message: string, statusCode?: number, otherMessage?: unknown) {
        super(message);
        this.otherMessage = otherMessage;
        this.statusCode = statusCode || 400;
    }
}