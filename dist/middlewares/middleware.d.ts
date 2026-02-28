import { Request, Response, NextFunction } from "express";
interface JwtPayload {
    userId: string;
    role?: string;
    admin?: string;
    email?: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: any;
            userId?: string;
            admin?: JwtPayload;
        }
    }
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const adminOnly: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=middleware.d.ts.map