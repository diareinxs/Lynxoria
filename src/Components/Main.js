import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import Login from "./Login/Login";
import About from "./About/about";

const Main = () => {
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("home");

    const searchBook = (evt) => {
        if (evt.key === "Enter") {
            axios
                .get(
                    "https://www.googleapis.com/books/v1/volumes?q=" +
                        search +
                        "&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU" +
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
    };

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!userDropdownOpen);
    };

    const handleNavClick = (page) => {
        setCurrentPage(page);
    };

    if (!isLoggedIn) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <>
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item" onClick={() => handleNavClick("home")}>Home</li>
                <li className="nav-item" onClick={() => handleNavClick("about")}>About</li>
                <li className="nav-item user-menu" onClick={toggleUserDropdown}>
                    User
                    {userDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li className="dropdown-item">Edit Information</li>
                            <li className="dropdown-item" onClick={handleLogout}>Logout</li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
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
                    <img src="./images/bg2.png" alt="" />
                </div>
            </div>

            <div className="container">{<Card book={bookData} />}</div>
            </>
        )}
        {currentPage === "about" && <About />}
        </>
    );
};

export default Main;
