import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import Login from "./Login/Login";
import About from "./About/about";
import Chatbot from "./Chatbot/Chatbot";
import ForgotPass from "./Forgot_password/forgot_pass";
import SignUp from "./Sign_up/sign_up";
import logo from "./Lynxoria Logos.png";
import UserInfo from "./User Info/user_info";

import roboticsIcon from "./robotics.png";

import { GOOGLE_BOOKS_API_KEY } from "../config";

const Main = () => {
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("home");
    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false); // renamed for clarity
    const [showForgotPass, setShowForgotPass] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);

    const searchBook = (evt) => {
        if (evt.key === "Enter") {
            axios
                .get(
                    "https://www.googleapis.com/books/v1/volumes?q=" +
                        search +
                        "&key=" + GOOGLE_BOOKS_API_KEY +
                        "&maxResults=40"
                )
                .then((res) => setData(res.data.items))
                .catch((err) => console.log(err));
        }
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserDropdownOpen(false);
        setShowLogoutOverlay(false);
    };

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!userDropdownOpen);
    };

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setShowSignUp(false);
    };

    const openLogoutOverlay = () => {
        setShowLogoutOverlay(true);
        setUserDropdownOpen(false);
    };

    const closeLogoutOverlay = () => {
        setShowLogoutOverlay(false);
    };

    const openForgotPass = () => {
        setShowForgotPass(true);
    };

    const closeForgotPass = () => {
        setShowForgotPass(false);
    };

    const openSignUp = () => {
        setShowSignUp(true);
    };

    const closeSignUp = () => {
        setShowSignUp(false);
    };

    const openUserInfoEditor = () => {
        setIsEditingUserInfo(true);
        setUserDropdownOpen(false);
    };

    const closeUserInfoEditor = () => {
        setIsEditingUserInfo(false);
    };

    if (!isLoggedIn) {
        if (showForgotPass) {
            return <ForgotPass onBackToLogin={closeForgotPass} />;
        }
        if (showSignUp) {
            return <SignUp onSignUpSuccess={() => { setIsLoggedIn(true); setShowSignUp(false); }} />;
        }
        return (
            <>
                <Login onLoginSuccess={handleLoginSuccess} onForgotPassword={openForgotPass} onSignUp={openSignUp} />
            </>
        );
    }

    if (isEditingUserInfo) {
        return <UserInfo onClose={closeUserInfoEditor} />;
    }

    return (
        <>
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-item" onClick={() => handleNavClick("home")}>Home</li>
                    <li className="nav-item" onClick={() => handleNavClick("about")}>About</li>
                    {/* Nav item from nav bar */}
                    <li className="nav-item user-menu" onClick={toggleUserDropdown}>
                        User
                        {userDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li className="dropdown-item" onClick={openUserInfoEditor}>Edit Information</li>
                                <li className="dropdown-item" onClick={openLogoutOverlay}>Logout</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
            {/* Floating circular chatbot button */}
            <button
                onClick={() => handleNavClick("chatbot")}
                className="floating-chatbot-button"
                aria-label="Open Chatbot"
            >
                <img
                    src={roboticsIcon}
                    alt="Chatbot Icon"
                    className="floating-chatbot-icon"
                />
            </button>
            {showLogoutOverlay && (
                <div className="logout-overlay">
                    <div className="logout-content">
                        <h2>Confirm Logout</h2>
                        <p>Are you sure you want to logout?</p>
                        <div className="modal-buttons">
                            <button className="btn btn-yes" onClick={handleLogout}>Yes</button>
                            <button className="btn btn-no" onClick={closeLogoutOverlay}>No</button>
                        </div>
                    </div>
                </div>
            )}
            {currentPage === "home" && (
                <>
                    <div className="header">
                        <div className="row1">
                            <h1>
                                Lynxoria <br /> Your Next Literary Adventure!
                            </h1>
                        </div>
                        <div className="row2">
                            <h2>Find Your Book</h2>
                            <div className="search">
                                <input
                                    type="text"
                                    placeholder="Enter Your Book Name"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={searchBook}
                                />
                                <button>
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                            <img src={logo} alt="" />
                        </div>
                    </div>

                    <div className="container">{<Card book={bookData} />}</div>
                </>
            )}
            {currentPage === "about" && <About />}
            {currentPage === "chatbot" && <Chatbot />}
        </>
    );
};

export default Main;
