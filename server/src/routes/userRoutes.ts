import express from "express";
import {
  exampleRoute,
  loginUser,
  registerUser,
} from "../controllers/userController";
import checkIsUserAuthenticated from "../middleware/authentication";

const router = express.Router();

/**
 * Route: POST /register
 * Description: Registers a new user.
 * Middleware: None
 */
router.post("/register", registerUser);

/**
 * Route: POST /login
 * Description: Logs in a user.
 * Middleware: None
 */
router.post("/login", loginUser);

/**
 * Route: GET /
 * Description: Example route to test the API endpoint. Requires user authentication.
 * Middleware: checkIsUserAuthenticated (Authentication middleware)
 */
router.get("/", checkIsUserAuthenticated, exampleRoute);

export default router;
