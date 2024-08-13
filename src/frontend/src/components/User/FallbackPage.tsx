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
            className="bg-base-variant dark:bg-darkmode-base-variant mt-[20vh] pt-20 pb-0 px-0 min-h-[90vh] text-text flex flex-col items-center rounded-t-xl md:pt-4 md:pb-0 md:px-4 pt-16">
            <h1>{header}</h1>
            <p>{message}</p>
            {errorCode && !hideErrorCode.includes(errorCode) && (
                <p>Error Code: {errorCode}</p>
            )}
            <button onClick={handleGoBack}>
                Go Back
            </button>
        </div>
    );
};

export default FallbackPage;