import express, { Router } from 'express';
const router = express.Router();
import { signup, login, logout } from '../controllers/authControllers.js'
import protectRoute from '../middleware/auth.middleware.js';

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', protectRoute, (req, res)=> {
    res.send({
        success: true,
        user: req.user
    })
});


export default router;