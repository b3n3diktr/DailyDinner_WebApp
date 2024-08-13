import React from 'react';
import '../../style.css';
import {Link} from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div
            className="bg-base-variant dark:bg-darkmode-base-variant mt-[20vh] pt-20 pb-0 px-0 min-h-[90vh] flex flex-col items-center rounded-t-xl md:pb-0 md:px-4 text-text dark:text-darkmode-text">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default NotFound;