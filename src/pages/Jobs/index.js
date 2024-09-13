import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { ThreeDots } from "react-loader-spinner";
import JobList from "../../components/JobList";
import "./index.css";

// Constants for job list API status
const jobListApiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  in_progress: "IN_PROGRESS",
  failure: "FAILURE",
};

export default function Jobs() {
  // State to store job list data, API status, and current page
  const [jobListData, setJobListData] = useState([]);
  const [jobListApiStatus, setJobListApiStatus] = useState(
    jobListApiStatusConstants.initial
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Function to format job data
  const getFormattedJobsListData = (data) => ({
    id: data.id,
    companyName: data.company_name,
    jobDescription: data.title,
    jobRole: data.job_role,
    jobCategory: data.job_category,
    noOfOpenings: data.openings_count,
    ContactNumber: data.whatsapp_no,
    noOfApplicants: data.num_applications,
    place: data.primary_details.Place,
    salary:
      data.primary_details.Salary === "-"
        ? "Not Disclosed"
        : data.primary_details.Salary,
    experienceRequired: data.primary_details.Experience,
    qualification: data.primary_details.Qualification,
    postedOn: formatDistanceToNow(new Date(data.created_on), {
      addSuffix: true,
    }),
    isBookmarked: data.is_bookmarked,
    employmentType: data.job_hours,
  });

  // Function to fetch job list data from API
  const getjobListData = async (page = 1) => {
    setJobListApiStatus(jobListApiStatusConstants.in_progress);
    const jobListApiUrl = `https://testapi.getlokalapp.com/common/jobs?page=${page}`;
    try {
      const jobsListApiResponse = await fetch(jobListApiUrl);
      if (jobsListApiResponse.ok) {
        const fetchedJobListData = await jobsListApiResponse.json();
        const formattedJobListData = fetchedJobListData.results
          .map((eachJob) => {
            if (eachJob.id !== undefined) {
              return getFormattedJobsListData(eachJob);
            }
          })
          .filter((eachJob) => eachJob !== undefined);
        setJobListData(formattedJobListData);
        setJobListApiStatus(jobListApiStatusConstants.success);
      } else {
        setJobListApiStatus(jobListApiStatusConstants.failure);
      }
    } catch (error) {
      setJobListApiStatus(jobListApiStatusConstants.failure);
    }
  };

  // Fetch job list data when the component mounts or currentPage changes
  useEffect(() => {
    getjobListData(currentPage);
  }, [currentPage]);

  // Retry fetching job list data on failure
  const onClickRetry = () => {
    getjobListData(currentPage);
  };

  // Handle page change for pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= 3) {
      setCurrentPage(newPage);
    }
  };

  // Render loader while data is being fetched
  const renderLoader = () => (
    <div className="loader-container">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4f46e5"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );

  // Render list of jobs
  const renderJobList = () => (
    <ul className="job-list-container">
      {jobListData.map((eachJob) => (
        <JobList key={eachJob.id} jobDetails={eachJob} isBookmarkList={false} />
      ))}
    </ul>
  );

  // Render failure view with retry button
  const renderFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure-image"
      />
      <p>Oops! Something Went Wrong </p>
      <button type="button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  );

  // Render pagination controls
  const renderPagination = () => (
    <div className="pagination-container">
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="next-and-prev-btn"
      >
        Previous
      </button>
      <p>
        Page <span>{currentPage} </span> of 3
      </p>
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === 3}
        className="next-and-prev-btn"
      >
        Next
      </button>
    </div>
  );

  // Determine what to render based on API status
  const renderJobsView = () => {
    switch (jobListApiStatus) {
      case jobListApiStatusConstants.success:
        return (
          <div>
            {renderJobList()}
            {renderPagination()}
          </div>
        );
      case jobListApiStatusConstants.in_progress:
        return renderLoader();
      case jobListApiStatusConstants.failure:
        return renderFailure();
      default:
        return null;
    }
  };

  return (
    <div className="jobs-bg-container">
      <div className="jobs-responsive-container">{renderJobsView()}</div>
    </div>
  );
}
