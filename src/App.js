import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Bookmarks from "./pages/Bookmarks";
import Navbar from "./components/Navbar";
import JobContext from "./context/JobContext";

function App() {
  // State to store job details and bookmarked jobs
  const [jobDetailsData, setJobDetailsData] = useState({});

  // Effect to initialize bookmarked jobs from local storage on component mount
  useEffect(() => {
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedJobs")) || {};
    setJobDetailsData((prevData) => ({
      ...prevData,
      bookmarkedJobs: savedBookmarks,
    }));
  }, []);

  // Function to add job details and update local storage
  const addJobDetails = (data) => {
    setJobDetailsData(data);
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedJobs")) || {};
    savedBookmarks[data.id] = data.isBookmarked;
    localStorage.setItem("bookmarkedJobs", JSON.stringify(savedBookmarks));
  };

  return (
    <JobContext.Provider
      value={{
        jobDetailsData,
        addJobDetails,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
      <Navbar />
    </JobContext.Provider>
  );
}

export default App;
