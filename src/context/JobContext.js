import React from "react";

// Create a Context with default values
const JobContext = React.createContext({
  jobDetailsData: {}, // Default empty object for job details data
  addJobDetails: () => {}, // Default noop function for adding job details
});

export default JobContext;
