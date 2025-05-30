const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendSupportEmail = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to send support messages'
    );
  }

  const { subject, message } = data;
  const userEmail = context.auth.token.email;
  const userId = context.auth.uid;

  if (!subject || !message) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Subject and message are required'
    );
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER, // Send to support email if configured
    subject: `Support Request: ${subject}`,
    text: `Support Request Details:
From: ${userEmail}
User ID: ${userId}
Subject: ${subject}

Message:
${message}

This is an automated support request from the application.`,
    replyTo: userEmail // Allow support team to reply directly to the user
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Failed to send support email:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to send email',
      error
    );
  }
}); 