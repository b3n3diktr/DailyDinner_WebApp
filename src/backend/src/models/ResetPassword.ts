import { Schema, model, Document } from 'mongoose';
import bcrypt from "bcryptjs";

export interface IResetPassword extends Document {
    token: string;
    userId: string;
    email: string;
    createdAt: string;
    resetToken: string;
    newPassword: string;
    confirmToken: string;
    compareNewPassword(candidatePassword: string): Promise<boolean>;
}

const ResetPasswordSchema = new Schema<IResetPassword>({
    token: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: String, required: true },
    resetToken: { type: String, required: false, unique: true },
    newPassword: { type: String, required: false },
    confirmToken: { type: String, required: false, unique: true },
});

ResetPasswordSchema.pre('save', async function (this: IResetPassword, next) {
    if (!this.isModified('newPassword')) return next();
    const salt = await bcrypt.genSalt(10);
    this.newPassword = await bcrypt.hash(this.newPassword, salt);
    next();
});

ResetPasswordSchema.methods.compareNewPassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.newPassword);
};

const ForgotPassword = model<IResetPassword>('ForgotPassword', ResetPasswordSchema);

export default ForgotPassword;