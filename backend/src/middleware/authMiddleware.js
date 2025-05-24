import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const regInputValidation = (req, res, next) => {
    const { name, email, password } = req.body;

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

export const inputValidation = (req, res, next) => {
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

export const isAuth = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "")
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Check if the token is valid
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Check if the user exists
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}