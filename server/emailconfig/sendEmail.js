import nodemailer from "nodemailer";
import { WELCOME_EMAIL } from "./email.template.js";

export const sendEmail = async (email) => {
    try {
        // Create a transporter using Gmail's SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail", // Gmail SMTP service
            auth: {
                user: "nodemailexpress@gmail.com", // Replace with your Gmail address
                pass: "ilkx hstg gpjs fbvc",       // Replace with your Gmail app-specific password
            },
        });

        // Send email
        const info = await transporter.sendMail({
            from: '"Crushly" <nodemailexpress@gmail.com>', // sender address
            to: email,                                        // recipient email
            subject: "Ready to Connect?",                  // subject line
            html: WELCOME_EMAIL
        });

        console.log("Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
