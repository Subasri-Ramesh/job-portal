import express from "express";
import { getAllJobs, postJob, getMyJobs, updateJob, deleteJob, getSingleJob }from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";
import Job from '../models/jobSchema.js';
const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthorized, postJob);
router.get("/getmyjobs", isAuthorized, getMyJobs);

router.put("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);
router.get("/:id", isAuthorized, getSingleJob);

// Define a route for searching jobs
router.get('/api/jobs', async (req, res) => {
    try {
        const searchQuery = req.query.search;
        let jobs;
        
        // If there is a search query, filter the jobs
        if (searchQuery) {
            jobs = await Job.find({
                title: { $regex: searchQuery, $options: 'i' },
            });
        } else {
            // If no search query, return all jobs
            jobs = await Job.find();
        }

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid job ID' });
    }
  
    try {
      const job = await Job.findById(id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.json({ job });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
 
export default router;