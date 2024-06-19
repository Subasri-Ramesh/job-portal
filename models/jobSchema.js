import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 50 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide job description."],
    minLength: [30, "Job description must contain at least 50 Characters!"],
    maxLength: [20000, "Job description cannot exceed 500 Characters!"],
  },
  companyName: {
    type: String,
    required: [true, "Please provide Company Name."],
    minLength: [5, "Company Name must contain at least 5 Characters!"],
    maxLength: [100, "Company Name cannot exceed 500 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Job category is required!"],
  },
  experience: {
    type: String,
    required: [true, "Experience is required!"],
  },
  musthaveskills: {
    type: String,
    required: [true, "Skills are required!"],
  },
  education: {
    type: String,
    required: [true, "Education is required!"],
  },
  country: {
    type: String,
    required: [true, "Job country is required!"],
  },
  city: {
    type: String,
    required: [true, "Job city is required!"],
  },
  location: {
    type: String,
    required: [true, "Please provide exact location."],
    minLength: [10, "Location must contain at least 10 characters!"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary From must contain at least 4 digits"],
    maxLength: [9, "Salary From cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary To must contain at least 4 digits"],
    maxLength: [9, "Salary To cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
