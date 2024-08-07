import React from 'react';
import '../../style.css';
import {Link} from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="wrapper-main">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default NotFound;