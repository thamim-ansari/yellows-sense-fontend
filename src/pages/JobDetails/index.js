import React, { useState, useEffect, useCallback, useContext } from "react";
import { FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import JobContext from "../../context/JobContext";
import "./index.css";

export default function JobDetails() {
  // Get job details from context
  const { jobDetailsData } = useContext(JobContext);
  // State to manage whether the job is bookmarked
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Effect to check if the job is already bookmarked
  useEffect(() => {
    const bookmarkList = JSON.parse(localStorage.getItem("bookmarkList")) || [];
    const jobIsBookmarked = bookmarkList.some(
      (item) => item.id === jobDetailsData.id
    );
    setIsBookmarked(jobIsBookmarked);
  }, [jobDetailsData]);

  // Callback to handle adding/removing bookmark
  const onClickAddBookmark = useCallback(() => {
    const bookmarkList = JSON.parse(localStorage.getItem("bookmarkList")) || [];
    const bookmarkIndex = bookmarkList.findIndex(
      (eachItem) => eachItem.id === jobDetailsData.id
    );

    if (bookmarkIndex > -1) {
      // Remove from bookmarks if already present
      bookmarkList.splice(bookmarkIndex, 1);
      setIsBookmarked(false);
    } else {
      // Add to bookmarks if not present
      bookmarkList.push(jobDetailsData);
      setIsBookmarked(true);
    }

    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  }, [jobDetailsData]);

  // Callback to handle removing bookmark
  const onClickRemoveBookmark = useCallback(() => {
    const bookmarkList = JSON.parse(localStorage.getItem("bookmarkList")) || [];
    const updatedBookmarkList = bookmarkList.filter(
      (item) => item.id !== jobDetailsData.id
    );
    localStorage.setItem("bookmarkList", JSON.stringify(updatedBookmarkList));
    setIsBookmarked(false);
  }, [jobDetailsData]);

  return (
    <div className="job-details-bg-container">
      <div className="job-details-responsive-container">
        <div className="job-details-container">
          <div className="job-details-jobrole-companyname-location">
            <div>
              <h1>{jobDetailsData.jobRole}</h1>
              <p>{jobDetailsData.companyName}</p>
            </div>
            <div className="job-details-exp-and-salary">
              <p>
                <FaBriefcase />
                <span>{jobDetailsData.experienceRequired}</span>
              </p>
              <p>{jobDetailsData.salary}</p>
            </div>
            <p>
              <FaLocationDot />
              <span>{jobDetailsData.place}</span>
            </p>
          </div>
          <div className="job-details-postedon-to-applicants">
            <p>
              Posted: <span>{jobDetailsData.postedOn}</span>
            </p>
            <p>
              Openings: <span>{jobDetailsData.noOfOpenings}</span>
            </p>
            <p>
              Applicants: <span>{jobDetailsData.noOfApplicants}</span>
            </p>
          </div>
          <div className="job-detail-more-details-container">
            <p>
              <span>Job Category: </span>
              {jobDetailsData.jobCategory}
            </p>
            <p>
              <span>Job Description:</span>
              <br />
              {jobDetailsData.jobDescription}
            </p>
            <p>
              <span>Employment Type: </span>
              {jobDetailsData.employmentType}
            </p>
            <p>
              <span>Qualification: </span>
              {jobDetailsData.qualification}
            </p>
            <p>
              <span>Contact No: </span>
              {jobDetailsData.ContactNumber}
            </p>
          </div>
          <div className="job-details-btn-container">
            <button
              type="button"
              className="bookmark-btn"
              onClick={onClickAddBookmark}
            >
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>
            <button
              type="button"
              className="apply-btn"
              onClick={onClickRemoveBookmark}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
