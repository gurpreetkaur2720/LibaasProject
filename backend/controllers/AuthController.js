const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create and save user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });




        await newUser.save();

        const userInfo = {
            name: newUser.name,
            email: newUser.email
        }

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: userInfo
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}



const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        errorMessage = "Email or Password is wrong";

        if (!existingUser) {
            return res.status(403).json({
                message: errorMessage,
                success: false
            });
        }



        //compare password
        const isPasswordSame = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordSame) {
            return res.status(403).json({
                message: errorMessage,
                success: false
            });
        }



        const jwtToken = jwt.sign(
            { email: existingUser.email, _id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )





        return res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email,
            name: existingUser.name
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}





module.exports = {
    signup,
    login
}