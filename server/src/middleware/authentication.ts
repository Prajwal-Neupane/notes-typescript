import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { RequestHandler } from "express";
import { JWT_SECRET } from "../config";

/**
 * Import the JwtPayload type from "jsonwebtoken".
 * This type will be used in the MyJwtPayload interface.
 */
import { JwtPayload } from "jsonwebtoken";

/**
 * Define an interface for your JWT payload
 * It extends the JwtPayload type and adds a "userId" property.
 * Adjust the "userId" type according to your actual data type for userId.
 */
interface MyJwtPayload extends JwtPayload {
  userId: string;
}

/**
 * Middleware to check if the user is authenticated.
 * If the user is authenticated, it adds the "user" property to the request object.
 * The "user" property contains the user data fetched from the database using the userId from the JWT payload.
 * If the user is not authenticated, it sends a "Not authenticated" response.
 * If there is an error during token verification, it sends a "Token verification failed" response.
 */
const checkIsUserAuthenticated: RequestHandler = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      // Verify and decode the JWT token with the JWT_SECRET and cast the decoded token to MyJwtPayload type
      const decodedToken = jwt.verify(token, JWT_SECRET) as MyJwtPayload;
      const userId = decodedToken.userId;

      // Fetch the user from the database using the userId from the JWT payload and exclude the password field
      req.user = await User.findById(userId).select("-password");
      console.log(req.user);

      next();
    } catch (error) {
      // Handle token verification error
      res.json({ message: "Token verification failed" });
    }
  } else {
    // User is not authenticated
    res.json({ message: "Not authenticated" });
  }
};

export default checkIsUserAuthenticated;
