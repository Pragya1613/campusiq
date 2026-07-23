const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    package: {
      type: Number,
    },

    eligibilityCgpa: {
      type: Number,
      default: 0,
    },

    requiredSkills: [
      {
        type: String,
      },
    ],

    deadline: {
      type: Date,
    },

    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

    // ================================
    // Cascade Delete Applications
    // ================================
    
    jobSchema.pre(
      "findOneAndDelete",
      async function (next) {
      
        try {
        
          const job =
            await this.model.findOne(
              this.getFilter()
            );
          
          if (job) {
          
            await mongoose
              .model("Application")
              .deleteMany({
              
                jobId: job._id,
              
              });
            
          }
        
          next();
        
        }
      
        catch (error) {
        
          next(error);
        
        }
      
      }
    );

module.exports = mongoose.model("Job", jobSchema);