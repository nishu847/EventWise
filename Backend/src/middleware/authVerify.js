import { User } from "../model/user.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/APIerror.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asynchandler(async (req, res, next) => {
  try {
    // Check token in cookies or Authorization header
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Access token not found");
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    console.log("decoded token : ", decodedToken);

    // Find the user by the decoded token's user ID
    const user = await User.findById(decodedToken._id);
    console.log("user : ", user);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Attach user to request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging
    console.error("JWT verification failed:", error);
    throw new ApiError(401, error?.message || "Invalid access");
  }
});
