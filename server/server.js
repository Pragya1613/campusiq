const express = require("express");
const dotenv = require("dotenv");

dotenv.config();   // <-- YAHI PE

const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const emailRoutes = require("./routes/emailRoutes");

const interviewExperienceRoutes = require("./routes/interviewExperienceRoutes");

const interviewCommentRoutes = require("./routes/interviewCommentRoutes");


const aiRoutes = require("./routes/ai.routes");



connectDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications",applicationRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/interview-experiences", interviewExperienceRoutes);


app.get("/", (req, res) => {
  res.send("CampusIQ Backend Running");
});

app.use(
  "/api/interview-comments",
  interviewCommentRoutes
);


app.use("/api/ai", aiRoutes);


const PORT = process.env.PORT || 5000;


app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});