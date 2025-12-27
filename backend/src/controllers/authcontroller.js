const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Email simulation
        console.log(`Verify Email URL: http://localhost:5000/api/auth/verify/${token}`);

        res.status(201).json({
            message: 'Signup successful. Please verify your email.'
        });
    } catch (err) {
        res.status(500).json({ message: 'Signup failed' });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

        await User.update(
            { isVerified: true },
            { where: { id: decoded.id } }
        );

        res.send('Email verified successfully');
    } catch (err) {
        res.status(400).send('Invalid or expired token');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please verify your email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed' });
    }
};
