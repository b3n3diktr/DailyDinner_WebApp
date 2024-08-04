import { Schema, model, Document } from 'mongoose';

export interface IResetPassword extends Document {
    token: string;
    userId: string;
    email: string;
    createdAt: string;
}

const ResetPasswordSchema = new Schema<IResetPassword>({
    token: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: String, required: true },
});

const ForgotPassword = model<IResetPassword>('ForgotPassword', ResetPasswordSchema);

export default ForgotPassword;