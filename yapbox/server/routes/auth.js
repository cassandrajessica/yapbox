import express from 'express';
import User from '../models/user.js';
// middleware and route defining
const router = express.Router();

// create new user
router.post('/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const newUser = await user.save();
        res.status(201).json( { message: "Success", user: newUser });
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;