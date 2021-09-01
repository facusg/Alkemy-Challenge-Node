const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, name) => {
  const msg = {
    to: email,
    from: "facusgalante@gmail.com",
    subject: "DisneyWorld API",
    text: `${name} Welcome to Disney World  API`,
  };
  await sgMail.send(msg);
};

module.exports = { sendEmail };
