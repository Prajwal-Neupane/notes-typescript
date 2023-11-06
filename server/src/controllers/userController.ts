import { RequestHandler } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

/**
 * Example route to test the API endpoint.
 */
export const exampleRoute: RequestHandler = async (req, res) => {
  res.json({ message: "Hello World" });
};

/**
 * Request handler function for registering a new user.
 * It expects the user data (name, email, and password) in the request body.
 */
export const registerUser: RequestHandler = async (req, res) => {
  // Extract the user data from the request body
  const { name, email, password } = req.body;

  // Check if the user with the given email already exists in the database
  const existingUser = await User.findOne({ email });

  try {
    // Validate that all required fields (name, email, and password) are provided
    if (!name || !email || !password) {
      return res.json({ message: "All fields are required" });
    }

    // If a user with the same email already exists, return an error response
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance using the provided data
    const user = await User.create({ name, email, password: hashedPassword });

    // Save the new user instance to the database
    const response = await user.save();

    // Return a successful response with the newly created user data and HTTP status 201 (Created)
    res.status(201).json(response);
  } catch (error: any) {
    // If any error occurs during the process, handle it and return an error response
    return res.json({ message: error.message });
  }
};

/**
 * Request handler function for logging in a user.
 * It expects the user's email and password in the request body.
 */
export const loginUser: RequestHandler = async (req, res) => {
  // Extract the email and password from the request body
  const { email, password } = req.body;

  // Find the user with the given email in the database
  const user = await User.findOne({ email });

  try {
    // Check if the user exists in the database
    if (!user) {
      return res.json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error response
    if (!isPasswordValid) {
      return res.json({ message: "Invalid password" });
    }

    // Create a new user instance and generate a JWT token for authentication
    const token = jwt.sign(
      { name: user.name, email: user.email, userId: user.id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set the JWT token as a cookie (you may customize this part based on your requirements)
    res.cookie("jwt", token);

    // If the user exists and the password is valid, return the user data along with the token
    res.json({ user, token });
  } catch (error: any) {
    // If any error occurs during the process, handle it and return an error response
    return res.json({ message: error.message });
  }
};
