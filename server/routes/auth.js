const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Note: In a real app, use bcrypt for password hashing and jsonwebtoken for JWT.
// For this mvp/demo, we might start simple, but I will add placeholders for security.

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password, // TODO: Hash this password
            role
        });

        await user.save();

        res.status(201).json({ msg: 'User registered successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // TODO: Compare hashed password
        if (user.password !== password) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // TODO: Return JWT token
        res.json({ msg: 'Login successful', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
