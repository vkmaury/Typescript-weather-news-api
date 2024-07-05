import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    name: string;
    email: string;
    id: string;
    password: string;
    otp: string;
    otpVerified: boolean;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    otpVerified: { type: Boolean, default: false },
});

UserSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(candidatePassword, this.password);
        return match;
    } catch (error) {
        throw new Error();
    }
};
  
export default mongoose.model<IUser>('User', UserSchema);
