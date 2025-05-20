import React, { useEffect, useRef, useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logOut } from "../../firebase";
import { ContentContext } from "../../contexts/ContentContext.jsx";

function Navbar() {
  const navRef = useRef();
  const { content, setContent } = useContext(ContentContext);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current?.classList?.add("nav-dark");
      } else {
        navRef.current?.classList?.remove("nav-dark");
      }
    });
  }, []);
  return (
    <div className="navbar" ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className="icons" />
        <div className="content">
          {content ?? "Choose content"}
          <div className="dropdown">
            <p
              onClick={() => {
                setContent("children");
              }}
            >
              Children
            </p>
            <p
              onClick={() => {
                setContent("adult");
              }}
            >
              Adult
            </p>
          </div>
        </div>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p
              onClick={() => {
                logOut();
              }}
            >
              Sign out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
