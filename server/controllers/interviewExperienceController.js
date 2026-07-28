const InterviewExperience = require("../models/InterviewExperience");
const Student = require("../models/Student");
const mongoose = require("mongoose");
const asyncHandler = require("../middleware/asyncHandler");
const InterviewComment = require("../models/InterviewComment");

const createInterviewExperience = asyncHandler(async (req, res) => {
  const {
    companyName,
    title,
    roleApplied,
    package,
    experience,
    interviewProcess,
    tips,
    anonymous,
  } = req.body;

 const requiredFields = {
  companyName,
  title,
  roleApplied,
  experience,
  interviewProcess,
};

const missingFields = Object.entries(requiredFields)
  .filter(([_, value]) => !value || !value.toString().trim())
  .map(([key]) => key);

if (missingFields.length > 0) {
  return res.status(400).json({
    message: "Missing required fields",
    missingFields,
  });
}

  const student = await Student.findById(req.user.id)
  .select("_id")
  .lean();

  if (!student) {
    return res.status(404).json({
      message: "Student not found.",
    });
  }

  const interviewExperience = await InterviewExperience.create({
    companyName,
    studentId: student._id,
    title,
    roleApplied,
    package,
    experience,
    interviewProcess,
    tips,
    anonymous,
  });

  res.status(201).json({
    message: "Interview experience shared successfully.",
    interviewExperience,
  });
});


const getInterviewCompanies = async (req, res) => {
  try {
    const { search = "", sort = "Most Recent" } = req.query;

    const matchStage = {};

    if (search.trim()) {
      matchStage.companyName = {
        $regex: search,
        $options: "i",
      };
    }

    const companies = await InterviewExperience.aggregate([
      {
        $match: matchStage,
      },

      {
        $group: {
          _id: "$companyName",

          experienceCount: {
            $sum: 1,
          },

          latestExperience: {
            $max: "$createdAt",
          },

          totalUpvotes: {
            $sum: "$upvoteCount",
          },

          totalComments: {
            $sum: "$commentCount",
          },
        },
      },

      {
        $project: {
          _id: 0,

          companyName: "$_id",

          experienceCount: 1,

          latestExperience: 1,

          totalUpvotes: 1,

          totalComments: 1,
        },
      },
    ]);

    if (sort === "Most Upvoted") {
      companies.sort(
        (a, b) => b.totalUpvotes - a.totalUpvotes
      );
    } else if (sort === "Most Discussed") {
      companies.sort(
        (a, b) => b.totalComments - a.totalComments
      );
    } else {
      companies.sort(
        (a, b) =>
          new Date(b.latestExperience) -
          new Date(a.latestExperience)
      );
    }

    res.status(200).json({
      companies,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getCompanyExperiences = async (req, res) => {
  try {
    const { companyName } = req.params;

    const page = Math.max(
      1,
      parseInt(req.query.page) || 1
    );

    const limit = Math.min(
      20,
      Math.max(1, parseInt(req.query.limit) || 10)
    );
    
    const sort = req.query.sort || "Most Recent";

    const skip = (page - 1) * limit;

    let sortOption = {};

    switch (sort) {
      case "Most Upvoted":
        sortOption = { upvoteCount: -1 };
        break;

      case "Most Discussed":
        sortOption = { commentCount: -1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const totalExperiences = await InterviewExperience.countDocuments({
      companyName,
    });

    const experiences = await InterviewExperience.find({
      companyName,
    })
      .select(
        "title roleApplied package anonymous createdAt upvoteCount commentCount studentId"
      )
      .populate({
        path: "studentId",
        select: "name profilePicture",
      })
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();


    const totalPages = Math.ceil(totalExperiences / limit);


    const formattedExperiences = experiences.map((experience) => ({
      ...experience,
      student: experience.studentId,
      studentId: undefined,
    }));


    res.status(200).json({
      experiences: formattedExperiences,

      pagination: {
        currentPage: page,
        totalPages,
        totalExperiences,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });


  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getInterviewExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Interview Experience ID",
      });
    }

    const experience = await InterviewExperience.findById(id)
      .select(
        "companyName title roleApplied package experience interviewProcess tips anonymous upvoteCount commentCount createdAt studentId"
      )
      .populate({
        path: "studentId",
        select: "name profilePicture",
      })
      .lean();

    if (!experience) {
      return res.status(404).json({
        message: "Interview Experience not found",
      });
    }


    const formattedExperience = {
      ...experience,
      student: experience.studentId,
      studentId: undefined,
    };


    res.status(200).json({
      experience: formattedExperience,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const toggleExperienceUpvote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid Interview Experience ID",
    });
  }

  const experience = await InterviewExperience.findById(id);

  if (!experience) {
    return res.status(404).json({
      message: "Interview Experience not found.",
    });
  }

  const studentId = req.user.id;

  const alreadyUpvoted = experience.upvotes.some(
    (upvote) => upvote.toString() === studentId
  );

  if (alreadyUpvoted) {
    experience.upvotes = experience.upvotes.filter(
      (upvote) => upvote.toString() !== studentId
    );

    experience.upvoteCount -= 1;
  } else {
    experience.upvotes.push(studentId);
    experience.upvoteCount += 1;
  }

  await experience.save();

  res.status(200).json({
    message: alreadyUpvoted
      ? "Upvote removed successfully."
      : "Experience upvoted successfully.",
    upvoteCount: experience.upvoteCount,
    upvoted: !alreadyUpvoted,
  });
});


const updateInterviewExperience = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid Interview Experience ID",
    });
  }

  const experience = await InterviewExperience.findById(id);

  if (!experience) {
    return res.status(404).json({
      message: "Interview Experience not found.",
    });
  }

  // Only owner can update
  if (experience.studentId.toString() !== req.user.id) {
    return res.status(403).json({
      message: "You are not authorized to edit this experience.",
    });
  }

  const allowedFields = [
    "title",
    "roleApplied",
    "package",
    "experience",
    "interviewProcess",
    "tips",
    "anonymous",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      experience[field] = req.body[field];
    }
  });

  await experience.save();

  res.status(200).json({
    message: "Interview Experience updated successfully.",
    experience,
  });
});


const deleteInterviewExperience = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid Interview Experience ID",
    });
  }

  const experience = await InterviewExperience.findById(id);

  if (!experience) {
    return res.status(404).json({
      message: "Interview Experience not found.",
    });
  }

  // Only owner can delete
  if (experience.studentId.toString() !== req.user.id) {
    return res.status(403).json({
      message: "You are not authorized to delete this experience.",
    });
  }

  // Delete all comments & replies for this experience
  await InterviewComment.deleteMany({
    experienceId: id,
  });

  // Delete experience
  await experience.deleteOne();

  res.status(200).json({
    message: "Interview Experience deleted successfully.",
  });
});


module.exports = {
  createInterviewExperience,
  getInterviewCompanies,
  getCompanyExperiences,
  getInterviewExperienceById,
  toggleExperienceUpvote,
  updateInterviewExperience,
  deleteInterviewExperience,
};