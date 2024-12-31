import { Router } from "express";
import { registerUser,loginUser, forgotPassword, resetPassword, logoutUser, updateUsername } from "../controller/register.js";
import { verifyJWT } from "../middleware/authVerify.js";
import { getEvent } from "../controller/events.js";
import { getProducts } from "../controller/products.js";
const router=Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotpassword").post(forgotPassword)
router.route("/resetpassword").post(resetPassword)
router.route("/logout").post(verifyJWT,logoutUser)
router.put("/:userId", updateUsername);
router.get("/:userId/events", getEvent);
router.get("/:userId/products",getProducts)
export default router
