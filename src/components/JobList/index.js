import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSquarePhone, FaLocationDot, FaUserClock } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";

import JobContext from "../../context/JobContext";

import "./index.css";

export default function JobList(props) {
  const { jobDetails, isBookmarkList, removeBookmark } = props;
  const { addJobDetails } = useContext(JobContext);

  // Handler to add job details to the context
  const onClickAddJobDetails = () => {
    addJobDetails(jobDetails);
  };

  // Handler to remove job from bookmarks
  const onClickRemoveBookmark = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    event.preventDefault(); // Prevent default button behavior
    removeBookmark(jobDetails.id);
  };

  return (
    <li className="job-list-item-container" onClick={onClickAddJobDetails}>
      <Link to={`/jobs/${jobDetails.id}`} className="link-styles">
        <div className="job-item-role-and-postedon">
          <div>
            <p className="job-list-item-job-role">{jobDetails.jobRole}</p>
            <p className="job-list-item-company-name">
              {jobDetails.companyName}
            </p>
          </div>
          <p className="job-list-item-posted-on">{jobDetails.postedOn}</p>
        </div>
        <div className="job-item-location-and-jobhours">
          <div className="job-item-location-salary-contact">
            <p>
              <FaLocationDot />
              <span>{jobDetails.place}</span>
            </p>
            <p>
              <FaUserClock />
              <span>{jobDetails.employmentType}</span>
            </p>
            <p>
              <FaSquarePhone />
              <span>{jobDetails.ContactNumber}</span>
            </p>
          </div>
          <p>{jobDetails.salary}</p>
        </div>
        {isBookmarkList && (
          <div className="remove-bookmark-btn-container">
            <button onClick={onClickRemoveBookmark}>
              <IoMdCloseCircleOutline />
            </button>
          </div>
        )}
      </Link>
    </li>
  );
}
