const router = require('express').Router();
const User = require('../../models/user.model');
const auth = require('../../utils/auth');

router.get('/user', auth.required, async (req, res, next) => {
    try {
        const user = await User.findById(req.payload._id);

        if (!user) return res.sendStatus(401);
        return res.json({ success: true, user: user.toAuthJSON() });
    } catch (error) {
        res.json({ success: false, error });
        next();
    }
});

router.post('/user/register', async (req, res, next) => {
    try {
        const {
            firstName, lastName, phone, email
        } = req.body;
        const user = await new User({
            firstName, lastName, phone, email
        }).save();

        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
});

router.post('/user/login', async (req, res, next) => {
    if (!req.body.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }

    if (!req.body.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) res.json({ success: false, msg: 'Email not registered!' })

        const userData = user.checkPasswordAndGetUser(password);
        return res.json({ success: true, userData });
    } catch (error) {
        return res.json({ success: false, error });
    }
});

module.exports = router;
