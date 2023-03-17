const nodemailer = require("nodemailer");

// Create a transporter to send emails with nodemailer using gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: process.env.NODE_ENV !== "development",
  auth: {
    user: "paulbrooks@clientcycle.io",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Send verification email to user when they sign up for an account or change their email address
exports.sendAccountVerificationEmail = async (firstName, email, token) => {
  try {
    const mailOptions = {
      from: {
        name: "Client Cycle Support",
        address: "no-reply@clientcycle.io",
      },
      to: email,
      subject: `Client Cycle account verification`,
      html: `
      <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Client Cycle Account Verification</title>
    <style>
      /* Add some basic styles to the email */
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
      }

      h1 {
        margin-top: 0;
        font-size: 24px;
      }

      p {
        margin-bottom: 1em;
      }

      a {
        color: #337ab7;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>Welcome, ${firstName}!</h1>
    <p>
      Thank you for signing up for a Client Cycle account. To verify your account,
      please click the button below:
    </p>
    <p>
      <a
        href="${process.env.PRODUCTION_URL}/auth/verify-email?token=${token}"
        style="
          display: inline-block;
          padding: 0.5em 1em;
          background-color: #337ab7;
          color: #fff;
          border-radius: 4px;
        "
        >Verify Account</a
      >
    </p>
    <p>If you did not create a Client Cycle account, please ignore this email.</p>
    <p>Thank you,</p>
    <p>The Client Cycle Support Team</p>
  </body>
</html>`,
    };

    transporter.sendMail(mailOptions).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
};

// Send password reset email to user when they request a password reset
exports.sendResetPasswordEmail = async (email, token) => {
  try {
    const mailOptions = {
      from: {
        name: "Client Cycle Support",
        address: "no-reply@clientcycle.io",
      },
      to: email,
      subject: "Reset your Client Cycle password",
      html: `<h1>Reset your Client Cycle password</h1>
        <p>Please click the link below to reset your password.</p>
        <a href="${process.env.PRODUCTION_URL}/auth/reset-password?token=${token}">Reset Password</a>`,
    };

    transporter.sendMail(mailOptions).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
};
