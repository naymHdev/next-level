import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'naymhossen09@gmail.com',
      pass: 'fqyo mypy qpjq cmld',
    },
  });

  await transporter.sendMail({
    from: 'naymhossen09@gmail.com', // sender address
    to,
    subject: 'Hello boss, you reset your password within 10 minutes', // Subject line
    text: '', // plain text body
    html,
  });
};
