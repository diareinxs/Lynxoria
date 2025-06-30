import React from "react";
import "./about.css";

const About = () => {
    const developerInfo = (
        <div className="developer-info">
            <h2>Developed by</h2><p><strong>Regine Mae Hambiol</strong></p>
        </div>
    );

    return (
        <>
            <div className="about-container">
                <div className="about-overlay">
                    <h1>About Lynxoria</h1>
                    <p>
                        Lynxoria is your next literary adventure! We are dedicated to helping book lovers find their perfect read.
                        Our platform offers a vast collection of books from various genres and authors worldwide.
                    </p>
                    <p>
                        Our mission is to connect readers with books that inspire, educate, and entertain.
                        Whether you are looking for the latest bestseller or a timeless classic, Lynxoria is here to guide you.
                    </p>
                    <p>
                        Join our community of passionate readers and embark on your next literary journey with Lynxoria.
                    </p>
                </div>
            </div>

            {developerInfo}
        </>
    );
};

export default About;
