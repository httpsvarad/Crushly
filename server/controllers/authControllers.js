import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateCookie.js";
import { sendEmail } from "../emailconfig/sendEmail.js";

export const signup = async (req, res) => {

    const { name, email, password, age, gender, genderPreference } = req.body


    try {

        if (!name || !email || !password || !age || !gender || !genderPreference) {
            return res.status(400).json({ success: false, message: 'All fields are required.' })
        }

        if (age < 18) {
            return res.status(400).json({ success: false, message: 'You must be 18 or older to sign up.' })
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: 'User already exist, please login.' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            age,
            gender,
            genderPreference,
            password: hashedPassword
        })

        await user.save();

        generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            success: true,
            message: 'User created successfully.',
            user: {
                ...user._doc,
                password: undefined,
            },
        });

        await sendEmail(email);

    } catch (error) {

        console.log(error.message)
        res.status(500).json({ success: false, message: 'Server error, please try again.' });

    }

}


export const login = async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials.' })

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            try {
                generateTokenAndSetCookie(res, user._id);
                return res.status(200).json({
                    success: true,
                    message: 'User logged-in successfully.',
                    user: {
                        ...user._doc,
                        password: undefined,
                    }
                })
            } catch (error) {

                console.log('Error to login:', error.message);
                return res.status(500).json({
                    success: false,
                    message: 'Server error, please try again.'
                });

            }
        } else {
            return res.status(400).json({ success: false, message: 'Invalid credentials.' })
        }

    } catch (error) {

        console.log('Error to login:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server error, please try again.'
        });

    }

}


export const logout = (req, res) => {

    res.clearCookie("token");
    res.status(200).json({ success: true, message: 'User logged-out successfully.' });

}


