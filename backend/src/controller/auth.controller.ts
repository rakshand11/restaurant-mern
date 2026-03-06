import { Request, Response } from "express";
import { userModel } from "../model/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()

const jwtSecret = process.env.JWT_SECRET || ""

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            res.status(401).json({
                msg: "User already exist"
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        res.status(201).json({
            msg: "User created successfully"
        })
        return
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: "Internal Server Error"
        })
        return
    }

}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            res.status(401).json({
                msg: "User not have an existing account"
            })
            return
        }
        const passwordValidation = await bcrypt.compare(password, user.password)
        if (!passwordValidation) {
            res.status(401).json({ msg: "Invalid credentials" })
            return
        }
        const userId = user._id
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "30d" })

        res.cookie("userToken", token, {      //stored the cookie in the name of  userToken
            httpOnly: true,                   //js in the browser cannot access this cookie
            secure: false,                    //cookie can be sent over http
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000 //duration of cookie
        })
        res.status(200).json({
            msg: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }

        })
        return
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal Server Error" })
        return
    }
}

export const logoutUser = async (req: Request, res: Response) => {

    try {
        res.clearCookie("userToken")

        res.status(200).json({
            msg: "Logout successful"
        });
        return
    } catch (error) {
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
};


export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
        const jwtsecret = process.env.JWT_SECRET || ""
        if (email !== adminEmail || password !== adminPassword) {
            res.status(401).json({
                msg: "invalid credentials"
            })
            return
        }
        const token = jwt.sign(
            {
                role: "admin",
                email
            },
            jwtsecret,
            {
                expiresIn: "1d"
            }
        )

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000

        })
        // ✅ Send admin object to frontend
        return res.status(200).json({
            success: true,
            admin: {
                email,
                role: "admin"
            }
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }
}

export const getProfile = async (req: Request, res: Response) => {

    try {
        const user = await userModel.findById(req.user.id).select("-password")
        if (!user) {
            res.status(401).json({
                msg: "User not found"
            })
            return
        }
        res.status(200).json({
            msg: "User found successfully",
            user
        })
        return
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }
}

export const getAllProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.user
        const profiles = await userModel.find()
        res.status(200).json({
            msg: profiles
        })
        return
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: "Internal server error"
        })
        return
    }
}