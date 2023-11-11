export default class AppError extends Error {
    public otherMessage?: any;
    public statusCode: number;

    constructor(message: string, statusCode: number, otherMessage?: any) {
        super(message);
        this.otherMessage = otherMessage;
        this.statusCode = statusCode;
    }
}