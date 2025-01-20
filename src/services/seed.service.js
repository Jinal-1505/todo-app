import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const seedAdminUser = async () => {
    try {
        // Check if any users exist
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            console.log('Users already exist. No seed needed.');
            return;
        }

        // Create a default admin user
        const defaultAdmin = {
            firstName: 'Admin',
            lastName: 'Admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
        };

        // Hash the admin's password
        const saltRounds = 10;
        defaultAdmin.password = await bcrypt.hash(defaultAdmin.password, saltRounds);

        // Save the admin user
        const admin = await User.create(defaultAdmin);
        console.log('Default admin user created:', admin);
    } catch (err) {
        console.error('Error seeding admin user:', err);
    }
};

export default seedAdminUser;
