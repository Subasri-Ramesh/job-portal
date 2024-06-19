import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Jobs By Suba Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                JOB SEEKERS/ RECRUITER WILL CREATE ACCOUNT USING REGISTER
                IF YOU'RE A EXISTING USER YOU CAN LOGIN
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                RECRUITERS CAN POST A JOB AND RECRUIT THEM 
                JOB SEEKERS CAN FIND FOR A JOB 
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                RECRUITER CAN RECRUIT THE CANDIDATES AS PER JOB SEEKER SKILLS
                JOB SEEKERS CAN APPLY FOR A SUITABLE JOB
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;