const { sendEmail } = require("../services/emailService");

const testEmail = async (req, res) => {
  const result = await sendEmail({
    to: "misspragya1607@gmail.com",
    subject: "🎉 CampusIQ Email Test",
    html: `
      <div style="font-family: Arial, sans-serif; padding:20px;">
        <h2 style="color:#2563eb;">Welcome to CampusIQ 🚀</h2>

        <p>Hello Pragya,</p>

        <p>If you're reading this, your email service is working perfectly.</p>

        <hr>

        <p>
          This is a test email sent using
          <strong>Nodemailer</strong>.
        </p>

        <p style="margin-top:30px;">
          Regards,<br>
          <strong>CampusIQ Team</strong>
        </p>
      </div>
    `,
  });

  if (!result.success) {
    return res.status(500).json(result);
  }

  res.status(200).json({
    success: true,
    message: "Test email sent successfully.",
    data: result,
  });
};

module.exports = {
  testEmail,
};