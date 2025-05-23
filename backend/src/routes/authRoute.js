import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authRouter = Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}

const setUserTokenCookie = (token, res) => {
    res.cookie("CID", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
};

const regInputValidation = (req, res, next) => {
    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    //check name length
    if (name.length < 3 || name.length > 20) {
        return res.status(400).json({ message: "Name must be between 3 and 20 characters" });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    //check password length
    if (password.length < 6 || password.length > 20) {
        return res.status(400).json({ message: "Password must be between 6 and 20 characters" });
    }
    next();
}

authRouter.post("/register", regInputValidation, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { name }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //generate a random profile picture
        const profilePicture = `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}`;

        // Create new user
        const newUser = new User({
            name,
            email,
            password,
            profilePicture,
            isAdmin: false,
        });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);
        // Set cookie
        setUserTokenCookie(token, res);
        res.status(201).json({
            message: "User registered successfully", user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
                token,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

const inputValidation = (req, res, next) => {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    next();
}

authRouter.post("/login", inputValidation, async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate token
        const token = generateToken(user._id);
        setUserTokenCookie(token, res);
        res.status(200).json({
            message: "Login successful", user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                isAdmin: user.isAdmin,
                token,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

authRouter.post("/logout", async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default authRouter;