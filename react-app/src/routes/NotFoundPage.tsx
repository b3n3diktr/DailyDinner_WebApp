import React from "react";

const NotFoundPage: React.FC = () => {
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-background dark:bg-darkmode-background text-text dark:text-darkmode-text">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mt-4">Oops! The page you are looking for does not exist.</p>
            <a href="/" className="mt-6 px-6 py-3 bg-primary dark:bg-darkmode-primary text-white rounded-lg shadow-md hover:bg-primary-variant dark:hover:bg-darkmode-primary-variant transition duration-300">
                Go Back Home
            </a>
        </div>
    );
}

export default NotFoundPage;
