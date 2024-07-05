import { Router } from 'express';
import { signup, login, verifyOTP, updateProfile, updatePassword} from '../controllers/user.controller';
import  authMiddleware  from '../middleware/auth.middleware'; // Example middleware import

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.put('/profile', authMiddleware, updateProfile); 
router.put('/password', authMiddleware, updatePassword); 

export default router;
