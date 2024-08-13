import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../style.css';

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
            className="bg-base-variant dark:bg-darkmode-base-variant h-screen w-[max(40%,_37.5rem)] p-4 text-text flex flex-col items-center justify-center rounded-r-xl">
            <div className="bg-base dark:bg-darkmode-base shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-left text-text dark:text-darkmode-text">{header}</h1>
                <p className="mb-4 text-text dark:text-darkmode-text">{message}</p>
                {errorCode && !hideErrorCode.includes(errorCode) && (
                    <p className="mb-2 font-normal text-text-variant dark:text-darkmode-text-variant">Error Code: {errorCode}</p>
                )}
                <button
                    type="button"
                    onClick={handleGoBack}
                    className="w-full py-3 bg-accent text-white rounded-lg hover:bg-focus-text focus:outline-none"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default FallbackPage;