const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");


/**
 * @name registerUserController
 * @desc Register a new user
 * @access Public
 */
async function registerUserController(req, res) {

    try {

        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required"
            });
        }


        // Check whether user already exists
        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { Username: username },
                { email: email }
            ]
        });

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "Username or email already exists"
            });
        }


        // Hash password
        const hash = await bcrypt.hash(password, 10);


        // Create user
        const user = new userModel({
            Username: username,
            email: email,
            password: hash
        });

        await user.save();


        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.Username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        // Set cookie
        res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
});


        // Send response
        return res.status(201).json({
            message: "User registered successfully",

            user: {
                id: user._id,
                username: user.Username,
                email: user.email
            }
        });

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        return res.status(500).json({
            message: "Failed to register user",
            error: error.message
        });
    }
}


/**
 * @name loginUserController
 * @desc Login a user
 * @access Public
 */
async function loginUserController(req, res) {

    try {

        const { email, password } = req.body;


        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        // Find user
        const user = await userModel.findOne({
            email
        });


        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }


        // Compare password
        const isPasswordValid =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }


        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.Username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        // Set cookie
        res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
});


        // Send response
        return res.status(200).json({
            message: "User logged in successfully",

            user: {
                id: user._id,
                username: user.Username,
                email: user.email
            }
        });

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        return res.status(500).json({
            message: "Failed to login",
            error: error.message
        });
    }
}


/**
 * @name logoutUserController
 * @desc Logout a user
 * @access Public
 */
async function logoutUserController(req, res) {

    try {

        const token = req.cookies.token;

        if (token) {
            await tokenBlacklistModel.create({
                token
            });
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

        return res.status(500).json({
            message: "Failed to logout",
            error: error.message
        });
    }
}


/**
 * @name getMeController
 * @desc Get currently logged-in user
 * @access Private
 */
async function getMeController(req, res) {

    try {

        const user =
            await userModel.findById(req.user.id);


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        return res.status(200).json({

            message: "User fetched successfully",

            user: {
                id: user._id,
                username: user.Username,
                email: user.email
            }

        });

    } catch (error) {

        console.error(
            "Get user error:",
            error
        );

        return res.status(500).json({
            message: "Failed to fetch user",
            error: error.message
        });
    }
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};