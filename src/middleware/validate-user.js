import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const ValidateUser = async (req, res, next) => {
    let token; // Token to hold the JWT extracted from the `Authorization` header

    // Check if the `Authorization` header contains a Bearer token
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Extract the token after the 'Bearer' prefix
    }

    // If no token is provided, respond with a 401 Unauthorized status
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        // Verify the token using the secret key and decode its payload
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Retrieve the user from the database using the email from the decoded token
        req.user = await User.findOne({ email: decoded.email });

        // If user is found, pass control to the next middleware or route handler
        next();
    } catch (error) {
        // Respond with a 403 Forbidden status if the token is invalid or expired
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};
