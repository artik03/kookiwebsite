import { useEffect, useState } from "react";
import logoImg from "./assets/kooki-logo.svg";

export default function LandingPageNav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isLinkDisabled = true;
  return (
    <nav>
      {windowWidth < 1200 ? (
        <div className="dropdown-menu">
          <button
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            Menu
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              <a href="#">ABOUT</a>
              <a href="#">HOW TO</a>
              <a href="#">EXPLORE</a>
              <a href="#">MY RECIPES</a>
            </div>
          )}
        </div>
      ) : (
        <div id="nav-main-links">
          <a href="#">ABOUT</a>
          <a href="#">HOW TO</a>
          <a href="#">EXPLORE</a>
          <a href="#">MY RECIPES</a>
        </div>
      )}
      <div id="profile-and-logo-link">
        <img
          src={logoImg}
          alt="logo"
          id="logo"
          onClick={() => (window.location.href = "")}
        />
        <a
          href="#"
          id="nav-profile-link-disabled"
          className={isLinkDisabled ? "disabled" : ""}
        >
          MY PROFILE
        </a>
      </div>
      <div id="nav-account-links">
        <a href="#">LOG IN</a>
        <button id="nav-sign-up-btn">SIGN UP</button>
      </div>
    </nav>
  );
}
