const Job = require("../models/Job");
const Student = require("../models/Student");
const Application = require("../models/Application");
const { sendEmail } = require("../services/emailService");
const EMAIL_SUBJECTS = require("../utils/emailSubjects");

// Create Job
const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);


const students = await Student.find(
  {role: "student"},
  "fullName email"
);


    await Promise.all(
    students.map((student)=>
    sendEmail({

    to: student.email,
    subject: EMAIL_SUBJECTS.JOB_POSTED,
    template: "jobPosted",
    data:{
    studentName: student.fullName,
    companyName: job.companyName,
    jobTitle: job.title,
    packageOffered: job.package
    ? `₹ ${job.package} LPA`
    :"As per company standards",
    location: job.location,
    deadline: new Date(job.deadline).toLocaleDateString("en-IN"),
    jobId: job._id,

    }
    })
    )
    );

    res.status(201).json({
      message: "Job created successfully",
      job,
    });

  } 
  catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    
    const {
      search = "",
      company = "",
      status = "",
      location = "",
      cgpa = "",
      package: minPackage = "",
      sort = "Newest",
    } = req.query;

    const query = {};
    const andConditions = [];

    if (search.trim()) {
      andConditions.push({
        $or: [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            companyName: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      });
    }   

    if (company && company !== "All") {
      query.companyName = company;
    }

    if (location && location !== "All") {
      query.location = location;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (status === "Active") {
      andConditions.push({
        isActive: true,
        deadline: { $gte: today },
      });
    }

    if (status === "Closed") {
      andConditions.push({
        $or: [
          { isActive: false },
          { deadline: { $lt: today } },
        ],
      });
    }
    

    if (cgpa && cgpa !== "All") {
      query.eligibilityCgpa = {
        $gte: Number(cgpa),
      };
    }

    if (minPackage && minPackage !== "All") {
      query.package = {
        $gte: Number(minPackage),
      };
    }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }


 let sortOption = {};

  switch (sort) {
    case "Oldest":
      sortOption = { createdAt: 1 };
      break;

    case "Highest Package":
      sortOption = { package: -1 };
      break;

    case "Lowest Package":
      sortOption = { package: 1 };
      break;

    case "Deadline":
      sortOption = { deadline: 1 };
      break;

    default:
      sortOption = { createdAt: -1 };
  }

  const totalJobs = await Job.countDocuments();
  const filteredJobsCount = await Job.countDocuments(query);
  const allJobsForStats = await Job.find();
    

    const companies = await Job.distinct("companyName");

    const locations = await Job.distinct("location");

    const activeJobs = allJobsForStats.filter((job) => {
      if (!job.isActive) return false;
    
      if (!job.deadline) return true;
    
      const deadline = new Date(job.deadline);
      deadline.setHours(0, 0, 0, 0);
    
      return deadline >= today;
    }).length;

    const closedJobs = allJobsForStats.length - activeJobs;


 const totalPages = Math.ceil(filteredJobsCount / limit);

  const jobs = await Job.find(query)
    .sort(sortOption)
    .populate("collegeId", "name location")
    .skip(skip)
    .limit(limit);

    // If user is not logged in, return normal jobs

    if (!req.user) {
      return res.status(200).json({
        jobs,
        currentPage: page,
        totalPages,
        totalJobs,
        activeJobs,
        closedJobs,
        companies,
        locations,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      });
    }

    // Get logged-in student
    const student = await Student.findById(req.user.id);

    // If logged-in user is not a student
    if (!student) {
      return res.status(200).json({
        jobs,
        currentPage: page,
        totalPages,
        totalJobs,
        activeJobs,
        closedJobs,
        companies,
        locations,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      });
    }

    // Get student's applied jobs
    const applications = await Application.find({
      studentId: student._id,
    }).select("jobId");

    const appliedJobIds = applications.map((application) =>
      application.jobId.toString()
    );

    // Add eligibility & application status
    const updatedJobs = jobs.map((job) => ({
      ...job.toObject(),

      alreadyApplied: appliedJobIds.includes(
        job._id.toString()
      ),

      eligible:
        job.eligibilityCgpa == null
          ? true
          : student.cgpa >= job.eligibilityCgpa,
    }));

      res.status(200).json({
        jobs: updatedJobs,
        currentPage: page,
        totalPages,
        totalJobs,
        activeJobs,
        closedJobs,
        companies,
        locations,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Single Job
const getJobById = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id).populate(
      "collegeId",
      "name location"
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Job
const updateJob = async (req, res) => {
  try {

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Applications will be deleted automatically
    // by Job model middleware

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};