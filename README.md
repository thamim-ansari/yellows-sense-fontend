# Job Finder App

## Overview

The **Job Finder App** is a web application designed to help users find and bookmark job listings. It allows users to view a list of jobs, see detailed information about each job, and manage their bookmarks. The app features job listing pages, a job detail view, and a bookmarks page to view saved jobs.

## Features

- **Home Page**: Provides an introduction and a link to explore job listings.
- **Jobs Page**: Displays a paginated list of job postings with filtering and searching capabilities.
- **Job Details Page**: Shows detailed information about a specific job, including company details, job description, salary, and more.
- **Bookmarks Page**: Allows users to view and manage their bookmarked job listings.

## How It Works

1. **Home Page**: Users can navigate to different sections of the app from the home page.
2. **Jobs Page**: Fetches job data from an API and displays it in a paginated format. Users can navigate through pages and view job details.
3. **Job Details Page**: Fetches and displays detailed information about a selected job. Users can bookmark jobs from this page.
4. **Bookmarks Page**: Displays a list of jobs that users have bookmarked. Users can remove bookmarks if desired.

## Packages Used

- **React**: A JavaScript library for building user interfaces.
- **react-router-dom**: For routing and navigation within the app.
- **date-fns**: For date formatting.
- **react-loader-spinner**: For displaying loading spinners.
- **react-icons**: For icons used in the app.

## Installation

To set up and run this project locally, follow these steps:

1.  **Clone the Repository**:

    ```bash
         git clone https://github.com/thamim-ansari/yellows-sense-fontend.git
    ```

2.  **Navigate to the Project Directory:**
    ```bash
    cd job-finder-app
    ```
3.  **Install Dependencies:**

    ```bash
    npm install
    ```

4.  **Run the Application:**

        ```bash
        npm start
        ```

    This will start the development server and open the app in your default web browser. By default, the app will be available at http://localhost:3000.

## Usage

- Navigate through the app using the navigation bar.
- On the Jobs Page, browse and paginate through job listings.
- Click on a job to view more details on the Job Details Page.
- Bookmark jobs to save them in the Bookmarks Page.
  Manage your bookmarks from the bookmarks pag
