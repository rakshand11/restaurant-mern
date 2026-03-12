import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../model/user.model.js";
import dotenv from "dotenv"
dotenv.config()

interface JwtPayload {
    userId: string;
    role?: string;
    admin?: string
    email?: string
}

// Extend Express Request
declare global {
    namespace Express {
        interface Request {
            user?: any;
            userId?: string;
            admin?: JwtPayload;

        }
    }
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // 🔐 Get token from cookie
        const token = req.cookies.userToken;

        if (!token) {
            return res.status(401).json({
                msg: "Access denied. No token provided.",
            });
        }

        const jwtSecret = process.env.JWT_SECRET as string;

        // ✅ Verify token
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

        // ✅ Find user in DB
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                msg: "User not found.",
            });
        }

        // ✅ Attach to request
        req.user = user;
        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(401).json({
            msg: "Invalid or expired token.",
        });
    }
};

export const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.adminToken
    if (!token) {
        res.status(401).json({
            msg: "Not Authorized"
        })
        return
    }




    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload
        req.admin = decoded
        if (req.admin?.email === process.env.ADMIN_EMAIL) {
            next()
        } else {
            res.status(401).json({ msg: "Not Authorized" })
        }

    } catch (error) {
        res.status(401).json({
            msg: "Internal server error"
        })
        return
    }
}
