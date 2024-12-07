import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {

    const secretkey = process.env.JWT_SECRET

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided." });

    try {

        const decoded = jwt.verify(token, secretkey);

        if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token." });

        // req.userId = decoded.userId;

        const currentUser = await User.findById(decoded.userId);

        req.user = currentUser;

        next();

    } catch (error) {
        console.log("Error in protectRoute: ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export default protectRoute;
