const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications",applicationRoutes);
app.get("/", (req, res) => {
  res.send("CampusIQ Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});