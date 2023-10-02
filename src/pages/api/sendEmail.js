// pages/api/sendEmail.js
import nodemailer from 'nodemailer';
require('dotenv').config();

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const APPLICATION_PASSWORD = process.env.APPLICATION_PASSWORD;
export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: EMAIL_ADDRESS,
        pass: APPLICATION_PASSWORD,
      },
    });

    // Define email content
    const mailOptions = {
      from: 'subhan.akram2400@gmAIL.COM',
      to: email,
      subject,
      html: message,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
