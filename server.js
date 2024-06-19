import app from "./app.js";
import cloudinary from "cloudinary";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './models/jobSchema.js';
import applicationRouter from "./routes/applicationRouter.js";

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Job search endpoint
app.get('/api/jobs', async (req, res) => {
    const search = req.query.search || '';
    try {
        const jobs = await Job.find({
            title: { $regex: search, $options: 'i' }
        });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});