import React, { useState, useEffect } from "react";
import JobList from "../../components/JobList";
import "./index.css";

export default function Bookmarks() {
  // State to manage the list of bookmarked jobs
  const [bookmarkListData, setBookmarkListData] = useState(
    JSON.parse(localStorage.getItem("bookmarkList")) || []
  );

  // Function to remove a specific bookmark by its id
  const removeBookmark = (id) => {
    const updatedBookmarkList = bookmarkListData.filter((job) => job.id !== id);
    setBookmarkListData(updatedBookmarkList);
  };

  // Function to remove all bookmarks from local storage and state
  const onClickRemoveAllBookmarks = () => {
    localStorage.removeItem("bookmarkList");
    setBookmarkListData([]);
  };

  // Effect to update local storage whenever bookmarkListData changes
  useEffect(() => {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkListData));
  }, [bookmarkListData]);

  return (
    <div className="bookmarks-bg-container">
      <div className="bookmarks-responsive-container">
        <div className="bookmark-remove-all-btn-container">
          <button type="button" onClick={onClickRemoveAllBookmarks}>
            Remove all
          </button>
        </div>
        {bookmarkListData.length > 0 ? (
          <ul className="bookmark-list-container">
            {bookmarkListData.map((eachBookmark) => (
              <JobList
                key={eachBookmark.id}
                jobDetails={eachBookmark}
                isBookmarkList={true}
                removeBookmark={removeBookmark}
              />
            ))}
          </ul>
        ) : (
          <div className="no-bookmarks-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="empty-bookmarks"
            />
            <p>Currently, there are no bookmarks</p>
          </div>
        )}
      </div>
    </div>
  );
}
