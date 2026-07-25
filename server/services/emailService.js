const transporter = require("../config/emailConfig");

const {
  welcomeTemplate,
  jobPostedTemplate,
  applicationReceivedTemplate,
  shortlistedTemplate,
  interviewScheduledTemplate,
  selectedTemplate,
  rejectedTemplate,
  passwordResetTemplate,
} = require("../templates/emailTemplates");

const templates = {
  welcome: welcomeTemplate,
  jobPosted: jobPostedTemplate,
  applicationReceived: applicationReceivedTemplate,
  shortlisted: shortlistedTemplate,
  interviewScheduled: interviewScheduledTemplate,
  selected: selectedTemplate,
  rejected: rejectedTemplate,
  passwordReset: passwordResetTemplate,
};

const sendEmail = async ({
  to,
  subject,
  template,
  data = {},
}) => {

  try {

    const templateFunction = templates[template];

    if (!templateFunction) {
      throw new Error(`Template '${template}' not found.`);
    }

    const html = templateFunction(data);

    const info = await transporter.sendMail({
      from: `"CampusIQ" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };

  } catch (error) {

    console.error(error.message);

    return {
      success: false,
      error: error.message,
    };

  }

};

module.exports = {
  sendEmail,
};