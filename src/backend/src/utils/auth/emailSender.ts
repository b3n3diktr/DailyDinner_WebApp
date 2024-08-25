import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS} from "../../config/config";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

export async function sendEmail(to: string, subject: string, text: string) {
    try {
        await transporter.sendMail({
            from: EMAIL_USER,
            to,
            subject,
            text
        });
        console.log(`Email sent successfully to '${to}', subject: '${subject}'`);
    } catch (error) {
        console.error(`Error sending email to '${to}', Error:`, error);
    }
}
