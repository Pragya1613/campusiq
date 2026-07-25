const APP_NAME = process.env.APP_NAME || "CampusIQ";
const CLIENT_URL = process.env.CLIENT_URL;


const styles = {

body: `
margin:0;
padding:0;
background:#F5F7FA;
font-family:'Segoe UI',Arial,sans-serif;
color:#111827;
`,

container:`
width:100%;
background:#F5F7FA;
padding:40px 0;
`,

card:`
max-width:650px;
margin:auto;
background:#ffffff;
border:1px solid #E5E7EB;
border-radius:10px;
overflow:hidden;
`,

header:`
padding:28px 36px;
border-bottom:1px solid #E5E7EB;
`,

logo:`
font-size:28px;
font-weight:700;
color:#2563EB;
margin:0;
letter-spacing:-0.5px;
`,

tagline:`
margin-top:6px;
font-size:13px;
color:#6B7280;
`,

content:`
padding:40px 36px;
`,

title:`
margin:0 0 28px;
font-size:28px;
font-weight:600;
color:#111827;
`,

paragraph:`
margin:18px 0;
font-size:16px;
line-height:1.8;
color:#374151;
`,

button:`
display:inline-block;
padding:13px 24px;
background:#2563EB;
color:#ffffff;
text-decoration:none;
border-radius:6px;
font-size:15px;
font-weight:600;
`,

divider:`
border:none;
border-top:1px solid #E5E7EB;
margin:36px 0;
`,

footer:`
padding:28px 36px;
background:#FAFAFA;
border-top:1px solid #E5E7EB;
font-size:13px;
color:#6B7280;
line-height:1.7;
`

};


const createInfoTable = (details = []) => {
  if (!details.length) return "";

  return `
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        margin:32px 0;
        border:1px solid #E5E7EB;
        border-collapse:collapse;
      "
    >
      ${details
        .map(
          ({ label, value }) => `
            <tr>
              <td
                style="
                  width:180px;
                  padding:12px 16px;
                  background:#F9FAFB;
                  color:#111827;
                  font-weight:600;
                  border-bottom:1px solid #E5E7EB;
                "
              >
                ${label}
              </td>

              <td
                style="
                  padding:12px 16px;
                  color:#374151;
                  border-bottom:1px solid #E5E7EB;
                "
              >
                ${value}
              </td>
            </tr>
          `
        )
        .join("")}
    </table>
  `;
};



const createEmailLayout = ({
  title,
  greeting,
  body,
  details = [],
  buttonText,
  buttonLink,
  buttonColor = "#2563EB",
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${APP_NAME}</title>
</head>

<body style="${styles.body}">
  <div style="${styles.container}">
    <div style="${styles.card}">

      <div style="${styles.header}">
        <h1 style="${styles.logo}">${APP_NAME}</h1>
        <div style="${styles.tagline}">
          Campus Placement Management Platform
        </div>
      </div>

      <div style="${styles.content}">

        <h2 style="${styles.title}">
          ${title}
        </h2>

        <p style="${styles.paragraph}">
          ${greeting}
        </p>

        ${body}

        ${createInfoTable(details)}

        ${
          buttonText && buttonLink
            ? `
            <div style="margin-top:32px;">
              <a
                href="${buttonLink}"
                style="${styles.button};background:${buttonColor};"
              >
                ${buttonText}
              </a>
            </div>
          `
            : ""
        }

        <hr style="${styles.divider}">

        <p style="${styles.paragraph}">
          Regards,<br><strong>CampusIQ Team</strong>
        </p>

      </div>

      <div style="${styles.footer}">
        Training & Placement Platform
        <br><br>
        This is an automated email from <strong>${APP_NAME}</strong>.
        Please do not reply to this email.
      </div>

    </div>
  </div>
</body>
</html>
`;
};


const welcomeTemplate = ({ studentName }) =>
  createEmailLayout({
    title: "Welcome to CampusIQ",

    greeting: `Dear ${studentName},`,

    body: `
      <p style="${styles.paragraph}">
        Welcome to CampusIQ. Your account has been created successfully.
      </p>

      <p style="${styles.paragraph}">
        You can now explore placement opportunities, apply for jobs, and track your applications through your dashboard.
      </p>
    `,

    buttonText: "Explore Jobs",
    buttonLink: `${CLIENT_URL}/jobs`,
  });


 const jobPostedTemplate = ({
  studentName,
  companyName,
  jobTitle,
  packageOffered,
  location,
  deadline,
  jobId,
}) =>
  createEmailLayout({
    title: "New Placement Opportunity",

    greeting: `Dear ${studentName},`,

    body: `
      <p style="${styles.paragraph}">
        A new placement opportunity matching your profile has been published.
      </p>

      <p style="${styles.paragraph}">
        Review the job details below and submit your application before the deadline.
      </p>
    `,

    details: [
      { label: "Company", value: companyName },
      { label: "Role", value: jobTitle },
      { label: "Package", value: packageOffered },
      { label: "Location", value: location },
      { label: "Deadline", value: deadline },
    ],

    buttonText: "View Job",
    buttonLink: `${CLIENT_URL}/jobs/${jobId}`,
  });
  
  

const applicationReceivedTemplate = ({
  studentName,
  companyName,
  jobTitle,
  applicationDate,
}) =>
  createEmailLayout({
    title: "Application Submitted",

    greeting: `Dear ${studentName},`,

    body: `
      <p style="${styles.paragraph}">
        Your application has been submitted successfully.
      </p>

      <p style="${styles.paragraph}">
        You can track the status of your application anytime from your dashboard.
      </p>
    `,

    details: [
      { label: "Company", value: companyName },
      { label: "Role", value: jobTitle },
      { label: "Applied On", value: applicationDate },
    ],

    buttonText: "View Applications",
    buttonLink: `${CLIENT_URL}/applications`,
  });



const shortlistedTemplate = ({
  studentName,
  companyName,
  jobTitle,
}) =>
  createEmailLayout({
    title: "Congratulations! You're Shortlisted",

    greeting: `Dear ${studentName},`,

    body: `
      <p style="${styles.paragraph}">
        Congratulations! You have been shortlisted for the next stage of the recruitment process.
      </p>

      <p style="${styles.paragraph}">
        Please keep checking your dashboard for interview details and further updates.
      </p>
    `,

    details: [
      { label: "Company", value: companyName },
      { label: "Role", value: jobTitle },
    ],

    buttonText: "View Application",
    buttonLink: `${CLIENT_URL}/applications`,
  });  


const interviewScheduledTemplate = ({
  studentName,
  companyName,
  jobTitle,
  interviewDate,
  interviewTime,
  interviewMode,
}) =>
  createEmailLayout({
    title: "Interview Scheduled",

    greeting: `Dear ${studentName},`,

    body: `
      <p style="${styles.paragraph}">
        Your interview has been scheduled. Please review the details below and be available on time.
      </p>
    `,

    details: [
      { label: "Company", value: companyName },
      { label: "Role", value: jobTitle },
      { label: "Date", value: interviewDate },
      { label: "Time", value: interviewTime },
      { label: "Mode", value: interviewMode },
    ],

    buttonText: "View Details",
    buttonLink: `${CLIENT_URL}/applications`,
  });


  const selectedTemplate = ({
  studentName,
  companyName,
  jobTitle,
}) =>
  createEmailLayout({
    title: "Congratulations! You Have Been Selected",

    greeting: `Dear ${studentName},`,

    body: `
      <p style="${styles.paragraph}">
        Congratulations! You have successfully cleared the recruitment process and have been selected.
      </p>

      <p style="${styles.paragraph}">
        We wish you great success in your professional journey.
      </p>
    `,

    details: [
      { label: "Company", value: companyName },
      { label: "Role", value: jobTitle },
    ],

    buttonText: "View Offer",
    buttonLink: `${CLIENT_URL}/applications`,
    buttonColor: "#16A34A",
  });



  const rejectedTemplate = ({
  studentName,
  companyName,
  jobTitle,
}) =>
  createEmailLayout({
    title: "Application Status Update",

    greeting: `Dear ${studentName},`,

    body: `
      <p style="${styles.paragraph}">
        Thank you for your interest in this opportunity.
      </p>

      <p style="${styles.paragraph}">
        After careful consideration, the company has decided not to move forward with your application for this role.
      </p>

      <p style="${styles.paragraph}">
        We encourage you to continue applying for other opportunities available on CampusIQ.
      </p>
    `,

    details: [
      { label: "Company", value: companyName },
      { label: "Role", value: jobTitle },
    ],

    buttonText: "Browse Jobs",
    buttonLink: `${CLIENT_URL}/jobs`,
  });


  const passwordResetTemplate = ({
  studentName,
  resetLink,
}) =>
  createEmailLayout({
    title: "Reset Your Password",

    greeting: `Dear ${studentName},`,

    body: `
      <p style="${styles.paragraph}">
        We received a request to reset your CampusIQ account password.
      </p>

      <p style="${styles.paragraph}">
        If you made this request, click the button below to create a new password.
      </p>

      <p style="${styles.paragraph}">
        If you did not request a password reset, you can safely ignore this email.
      </p>
    `,

    buttonText: "Reset Password",
    buttonLink: resetLink,
  });


  module.exports = {
  welcomeTemplate,
  jobPostedTemplate,
  applicationReceivedTemplate,
  shortlistedTemplate,
  interviewScheduledTemplate,
  selectedTemplate,
  rejectedTemplate,
  passwordResetTemplate,
};