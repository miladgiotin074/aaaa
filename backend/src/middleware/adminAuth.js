import { validateInitData } from '../utils/auth.js';
import logger from '../config/logger.js';
import userModel from '../models/user.model.js';

export const adminAuthMiddleware = async (req, res, next) => {
    try {
        console.log(req);

        const user = await userModel.findOne({ telegramId: req.userData.user.id });
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        console.log(user);

        next();
    } catch (error) {
        logger.error('Admin authentication error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}; 