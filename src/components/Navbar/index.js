import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome, FaBookmark, FaBriefcase } from "react-icons/fa";

import "./index.css";

export default function Navbar() {
  const { pathname } = useLocation(); // Get the current path from the router
  const currentPath = pathname;

  return (
    <nav className="navbar-bg-container">
      <div className="navbar-responsive-container">
        <ul className="navbar-menu-list-container">
          {/* Link to Home page */}
          <Link to="/" className="link-styles">
            <li
              className={
                currentPath === "/" // Check if current path is Home
                  ? "navbar-menu-list-item-container active-path"
                  : "navbar-menu-list-item-container"
              }
            >
              <FaHome />
              <span>Home</span>
            </li>
          </Link>
          {/* Link to Jobs page */}
          <Link to="/jobs" className="link-styles">
            <li
              className={
                currentPath === "/jobs" // Check if current path is Jobs
                  ? "navbar-menu-list-item-container active-path"
                  : "navbar-menu-list-item-container"
              }
            >
              <FaBriefcase />
              <span>Jobs</span>
            </li>
          </Link>
          {/* Link to Bookmarks page */}
          <Link to="/bookmarks" className="link-styles">
            <li
              className={
                currentPath === "/bookmarks" // Check if current path is Bookmarks
                  ? "navbar-menu-list-item-container active-path"
                  : "navbar-menu-list-item-container"
              }
            >
              <FaBookmark />
              <span>Bookmarks</span>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
