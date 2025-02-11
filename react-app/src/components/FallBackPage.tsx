import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const FallbackPage: React.FC = () => {
    const navigate = useNavigate();
    const query = useQuery();

    const message = query.get('message') ?? 'An error occurred.';
    const errorCode = query.get('errorCode');
    const header = query.get('header') ?? 'Error';

    const handleGoBack = () => {
        navigate('/home', { replace: true });
    };

    const hideErrorCode = ['201', '200'];

    return (
        <div
            className="bg-background-variant-1 dark:bg-darkmode-background-variant-1 h-screen w-full p-4 text-text flex flex-col items-center justify-center rounded-r-xl"
        >
            <div className="bg-background dark:bg-darkmode-background shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-left text-text dark:text-darkmode-text">
                    {header}
                </h1>
                <p className="mb-4 text-text dark:text-darkmode-text">
                    {message}
                </p>
                {errorCode && !hideErrorCode.includes(errorCode) && (
                    <p className="mb-2 font-normal text-secondary-variant dark:text-darkmode-secondary-variant">
                        Error Code: {errorCode}
                    </p>
                )}
                <button
                    type="button"
                    onClick={handleGoBack}
                    className="w-full py-3 bg-primary text-text dark:text-darkmode-text rounded-lg hover:bg-primary-variant focus:outline-none transition-colors duration-200"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default FallbackPage;