import { Router } from "express";
import { adminLogin, getAllProfile, getProfile, loginUser, logoutUser, registerUser } from "../controller/auth.controller.js";
import { adminOnly, authMiddleware } from "../middlewares/middleware.js";
export const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin/login", adminLogin);
userRouter.post("/logout", logoutUser);
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.get("/profiles", adminOnly, getAllProfile);
//# sourceMappingURL=user.route.js.map