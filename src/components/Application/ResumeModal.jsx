import React from "react";

const ResumeModal = ({ fileUrl, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {fileUrl.toLowerCase().endsWith(".pdf") ? (
          <embed src={fileUrl} type="application/pdf"/>
        ) : (
          <img src={fileUrl} alt="resume" />
        )}
      </div>
    </div>
  );
};

export default ResumeModal;

