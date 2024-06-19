import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import './MyApplications.css'; // Import the CSS file


const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeFileUrl, setResumeFileUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        let response;
        if (user && user.role === "Employer") {
          response = await axios.get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          });
        } else {
          response = await axios.get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          });
        }
        setApplications(response.data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications");
      }
    };

    fetchApplications();
  }, [user]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/v1/application/status/${id}`, {
        status,
      }, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === id ? { ...application, status } : application
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update application status");
    }
  };

  const openModal = (FileUrl) => {
    setResumeFileUrl(FileUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h3><center>My Applications</center></h3>
          {applications.length <= 0 ? (
            <h6><center>No Applications Found</center></h6>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h3><center>Applications From Job Seekers</center></h3>
          {applications.length <= 0 ? (
            <h6><center>No Applications Found</center></h6>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
                updateApplicationStatus={updateApplicationStatus}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && <ResumeModal FileUrl={resumeFileUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p><span>Job Title:</span> {element.title}</p>
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>Skills:</span> {element.skills}</p>
      <p><span>CoverLetter:</span> {element.coverLetter}</p>
      <p><span>Status:</span> <span className={`status ${element.status}`}>{element.status}</span></p>
    </div>
    <div className="resume">
      {element.resume && element.resume.mimetype && element.resume.mimetype.startsWith("image/") ? (
        <a href={element.resume.url} target="_blank" rel="noopener noreferrer">View Resume</a>
      ) : (
        <a href={element.resume.url} target="_blank" rel="noopener noreferrer">View Resume</a>
      )}
    </div>
    <div className="btn_area">
      <button onClick={() => deleteApplication(element._id)}>
        Delete Application
      </button>
    </div>
  </div>
);

const EmployerCard = ({ element, openModal, updateApplicationStatus }) => (
  <div className="employer_seeker_card">
    <div className="detail">
      <p><span>Job Title:</span> {element.title}</p>
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>Skills:</span> {element.skills}</p>
      <p><span>CoverLetter:</span> {element.coverLetter}</p>
      <p><span>Status:</span> <span className={`status ${element.status}`}>{element.status}</span></p>
    </div>
    <div className="resume">
      {element.resume && element.resume.mimetype && element.resume.mimetype.startsWith("image/") ? (
        <a href={element.resume.url} target="_blank" rel="noopener noreferrer">View Resume</a>
      ) : (
        <a href={element.resume.url} target="_blank" rel="noopener noreferrer">View Resume</a>
      )}
    </div>
    <div className="button-area">
    <button className="selected-btn" onClick={() => updateApplicationStatus(element._id, 'selected')}>
        Selected
      </button>
      <button className="rejected-btn" onClick={() => updateApplicationStatus(element._id, 'rejected')}>
        Rejected
      </button>
    </div>
    </div>
  
);
