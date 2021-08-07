const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: email,
            subject: subject,
            html: text,
        });

        console.log("email sent");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;
