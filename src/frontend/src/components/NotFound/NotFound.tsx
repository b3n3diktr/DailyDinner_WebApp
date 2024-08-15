import React from 'react';
import '../../style.css';
import {Link} from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div
            className="bg-base-variant dark:bg-darkmode-base-variant mt-[20vh] pt-20 pb-0 px-0 min-h-[90vh] flex flex-col items-center rounded-t-xl md:pb-0 md:px-4 text-text dark:text-darkmode-text">
            <div className="m-10 max-w-[25rem]">

                <h1 className="text-4xl">404</h1>
                <h2 className=" text-2xl">We can't seem to find the page you're looking for.</h2>
                <p className="mb-10 mt-4 text-text-variant dark:text-darkmode-text-variant">Error code: 404</p>
                <button className="w-1/2 py-3 bg-accent text-white rounded-lg hover:bg-focus-text focus:outline-none">
                    <Link to="/">Return</Link>
                </button>
            </div>
        </div>
    );
};

export default NotFound;