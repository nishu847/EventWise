import { Router } from "express";
import { registerUser,loginUser, forgotPassword, resetPassword } from "../controller/register.js";
const router=Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotpassword").post(forgotPassword)
router.route("/resetpassword").post(resetPassword)
export default router