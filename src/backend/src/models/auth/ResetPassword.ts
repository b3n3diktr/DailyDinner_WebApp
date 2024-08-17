import { Schema, model, Document } from 'mongoose';

export interface IResetPassword extends Document {
    token: string;
    userId: string;
    email: string;
    createdAt: string;
    resetToken: string;
    compareNewPassword(candidatePassword: string): Promise<boolean>;
}

const ResetPasswordSchema = new Schema<IResetPassword>({
    token: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: String, required: true },
    resetToken: { type: String, required: false, unique: true },
});

const ForgotPassword = model<IResetPassword>('ForgotPassword', ResetPasswordSchema);

export default ForgotPassword;