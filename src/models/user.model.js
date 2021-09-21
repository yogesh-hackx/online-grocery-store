const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const REQUIRED_STRING = {
    type: String,
    required: true,
};

const userSchema = new mongoose.Schema({
    email: REQUIRED_STRING,
    phone: REQUIRED_STRING,
    firstName: REQUIRED_STRING,
    lastName: { type: String, default: '' },
    avatar: { type: String, default: '' },
    passwordHash: String,
    salt: String,
}, { timestamps: true });

userSchema.methods.setPassword = (password) => {
    this.salt = bcrypt.genSaltSync(10);
    this.passwordHash = bcrypt.hashSync(password, this.salt);
};

userSchema.methods.generateJWT = () => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        userId: this._id,
        username: this.firstName,
        exp: parseInt(exp.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
};

userSchema.methods.checkPasswordAndGetUser = (password) => {
    const hash = bcrypt.hashSync(password, this.salt);
    if (this.passwordHash === hash) {
        return {
            ...this.schema.methods.getUserProfileData(),
            token: this.schema.methods.generateToken()
        };
    }
    return false;
};

userSchema.methods.getUserProfileData = () => ({
    email: this.email,
    phone: this.phone,
    firstName: this.firstName,
    lastName: this.lastName,
    avatar: this.avatar,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
