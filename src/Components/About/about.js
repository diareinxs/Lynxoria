import React from "react";
import "./about.css";

const About = () => {
    const developerInfo = (
        <div className="developer-info">
            <h2>Brought to you by</h2>
            <h2><strong>Regine Mae Hambiol</strong></h2>
            <p><strong>I’m deeply passionate about using design as a tool to make information and learning more accessible. I believe that good design goes beyond visuals—it empowers people, simplifies technology, and bridges gaps in understanding. 
                This passion led me to develop Lynxoria, a platform that combines my love for reading and design to connect people with books that educate, inspire, and build a global culture of learning. 
                My goal is to continue creating digital experiences that serve real people and make a positive impact.</strong> </p>
            <p><strong>Hobbies:</strong> Reading,and Gaming</p>
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
