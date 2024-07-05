import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { IUser } from '../models/user';

interface AuthRequest extends Request {
    user?: IUser;
}

export default async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

   
    try {
        const decoded: any = jwt.verify(token, "kasjdkjsdkbsadkb");
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Invalid token.' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
}


