import React, { useState } from "react";
import Card from "../Card";
import "./home.css";

const Home = ({ search, setSearch, searchBook, bookData }) => {
    return (
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
    );
};

export default Home;
