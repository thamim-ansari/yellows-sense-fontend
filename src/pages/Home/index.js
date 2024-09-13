import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";

export default function Home() {
  // State to manage the visibility of the content
  const [isVisible, setIsVisible] = useState(false);

  // Effect to trigger visibility change after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // 100ms delay before content becomes visible

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-bg-container">
      <div className="home-main-container">
        <div className={`home-content-container ${isVisible ? "visible" : ""}`}>
          <h1>Find The Jobs That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="find-jobs-btn">Find Jobs</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
