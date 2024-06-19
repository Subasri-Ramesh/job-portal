import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import Job  from "../models/jobSchema.js";


export const employerGetAllApplications = catchAsyncError(
    async (req, res, next) => {
      const { role } = req.user;
      if (role === "Job Seeker") {
        return next(
          new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
      }
      const { _id } = req.user;
      const applications = await Application.find({ "employerID.user": _id });
      res.status(200).json({
        success: true,
        applications,
      });
    });

export const jobseekerGetAllApplications = catchAsyncError(
        async (req, res, next) => {
          const { role } = req.user;
          if (role === "Employer") {
            return next(
              new ErrorHandler("Employer not allowed to access this resource.", 400)
            );
          }
          const { _id } = req.user;
          const applications = await Application.find({ "applicantID.user": _id });
          res.status(200).json({
            success: true,
            applications,
    });
});
      
export const jobseekerDeleteApplication = catchAsyncError(
    async (req, res, next) => {
      const { role } = req.user;
      if (role === "Employer") {
        return next(
          new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
      }
      const { id } = req.params;
      const application = await Application.findById(id);
      if (!application) {
        return next(new ErrorHandler("Application not found!", 404));
      }
      await application.deleteOne();
      res.status(200).json({
        success: true,
        message: "Application Deleted Successfully!",
      });
    }
  );

  export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Resume File Required!", 400));
    }
  
    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
    if (!allowedFormats.includes(resume.mimetype)) {
      return next(
        new ErrorHandler("Invalid file type. Please upload your resume in a PDF,PNG,JPEG,JPG,OR WEBP file.", 400)
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );
    
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(new ErrorHandler("Failed to upload Resume ", 500));
    }
    const { title, name, email, coverLetter, phone, address, skills, jobId } = req.body;
    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };
    if (!jobId) {
      return next(new ErrorHandler("Job not found!", 404));
    }
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found!", 404));
    }
  
    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };
    if (
      !title||
      !name ||
      !email ||
      !coverLetter ||
      !phone ||
      !address ||
      !skills||
      !applicantID ||
      !employerID ||
      !resume
    ) {
      return next(new ErrorHandler("Please fill all fields.", 400));
    }
    const application = await Application.create({
      title, 
      name,
      email,
      coverLetter,
      phone,
      address,
      skills,
      applicantID,
      employerID,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  });

  export const updateApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const application = await Application.findById(id);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      application.status = status;
      await application.save();
  
      res.status(200).json({ message: 'Application status updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };