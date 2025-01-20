import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next(); // hash password if it it modified

//     // hash password
//     const salt = await bcrypt.getSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password); //compare password with hashed password
// };

const User = mongoose.model('User', userSchema);
export default User;
