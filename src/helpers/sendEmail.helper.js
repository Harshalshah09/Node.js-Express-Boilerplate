import nodemailer from "nodemailer";

// Disable TLS certificate validation (use with caution, not recommended for production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const sendEmail = async (to, subject, text) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail's SMTP service
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASSWORD, // Your Gmail password or app-specific password
    },
    // Optional: Configure secure connection settings
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates (for development only)
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // Recipient address (dynamically provided)
    subject, // Subject line (dynamically provided)
    text, // Plain text body (dynamically provided)
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", to);
  } catch (error) {
    // Log error if sending email fails
    console.error("Error sending email:", error);
  }
};
