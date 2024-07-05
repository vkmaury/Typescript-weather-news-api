import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { generateOTP } from '../utils/otp';

const JWT_SECRET = process.env.JWT_SECRET || 'kasjdkjsdkbsadkb';

interface AuthRequest extends Request {
    user?: IUser;
}

export interface AuthRequest1 extends Request {
    user?: { _id: string }; // Define your custom user object structure
}

interface AuthenticatedRequest1 extends Request {
    user: { 
        // Define your user object structure here
        userId: string;
        // Add any other properties you attach to req.user
    };
}

// Regular expression for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signup(req: Request, res: Response): Promise<void> {
    const { name, email, password }: { name: string, email: string, password: string } = req.body;

    try {

        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        // Check if user already exists
        let user: IUser | null = await User.findOne({ email });
        if (user) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        // Generate OTP
        const otp = generateOTP(6); // Generates a 6-digit OTP

        // Save OTP to the user object
        user = new User({ name, email, password, otp });
        await user.save();

        // Example: Send OTP to user via email (implementation needed)

        res.status(201).json({ message: 'User registered successfully. Please verify OTP.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

export async function verifyOTP(req: Request, res: Response): Promise<void> {
    const { email, otp }: { email: string, otp: string } = req.body;

    try {
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        const user: IUser | null = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (user.otp !== otp) {
            res.status(401).json({ error: 'Invalid OTP' });
            return;
        }

        user.otpVerified = true;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password }: { email: string, password: string } = req.body;

    try {

        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        let user: IUser | null = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Check if OTP is verified
        if (!user.otpVerified) {
            res.status(403).json({ error: 'OTP not verified. Please verify OTP to log in.' });
            return;
        }

    
        if (password !== user.password) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }
        const token: string = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  

        // Return successful login response (you might generate and return a JWT token here)
        res.status(200).json({ message: 'Login successful',token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

export async function updateProfile(req: AuthRequest, res: Response): Promise<void> {
    const { _id } = req.user!;
    const { name, email }: { name: string, email: string } = req.body;

    try {

        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        } 

        let user: IUser | null = await User.findById(_id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

export async function updatePassword(req: AuthRequest1, res: Response): Promise<void> {
    const { _id } = req.user!; // Assuming you have userId available in req.user
    const { oldPassword, newPassword }: { oldPassword: string, newPassword: string } = req.body;

    try {
        let user: IUser | null = await User.findById(_id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (oldPassword !== user.password) {
            res.status(400).json({ error: 'Invalid old password' });
            return;
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

