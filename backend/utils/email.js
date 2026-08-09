const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const { Resend } = require('resend');

const sendEmail = async (options) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || '7Alps <onboarding@resend.dev>';

  const { data, error } = await resend.emails.send({
    from,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  });

  if (error) {
    console.log('Email error:', error);
    throw error;
  }

  console.log('Email sent:', data?.id);
  return data;
};

module.exports = sendEmail;
