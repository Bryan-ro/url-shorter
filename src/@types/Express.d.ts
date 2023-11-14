declare namespace Express {
    interface Request {
        loginPayload: {
            id: number;
            name: string;
        }
    }
}