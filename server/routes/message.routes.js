import express, { Router } from 'express';
import protectRoute from '../middleware/auth.middleware.js';
import { getConversation, sendMessage } from '../controllers/messageControllers.js';

const router = express.Router();

router.post('/send', protectRoute, sendMessage);
router.get('/conversation/:userId', protectRoute, getConversation)

export default router;