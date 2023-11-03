import { createTransport } from 'nodemailer';
const transporter = createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});
const sendMail = async ({ toEmail, subject, text }: any) => {
  const mailOptions = {
    from: process.env.GOOGLE_EMAIL,
    to: toEmail,
    subject: subject,
    html: text,
  };
  return await transporter
    .sendMail(mailOptions)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export { sendMail, generateOTP };
