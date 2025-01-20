import User from '../models/user.model.js';

/**
 * Get Users
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({ message: 'User details fetched successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * delete User
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteUser = async (req, res) => {
    try {
        // Update the user's details in the database
        const result = await User.findByIdAndDelete(req.params.id);

        if (!result) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
