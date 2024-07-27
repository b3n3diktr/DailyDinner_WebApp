import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../style.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const FallbackPage: React.FC = () => {
    const navigate = useNavigate();
    const query = useQuery();

    const message = query.get('message') || 'An error occurred.';
    const errorCode = query.get('errorCode');
    const header = query.get('header') || 'Error';

    const handleGoBack = () => {
        navigate('/', { replace: true });
    };

    const hideErrorCode = ['201'];

    return (
        <div className="fallback-container">
            <h1 className="fallback-header">{header}</h1>
            <p className="fallback-message">{message}</p>
            {errorCode && !hideErrorCode.includes(errorCode) && (
                <p className="fallback-error-code">Error Code: {errorCode}</p>
            )}
            <button className="fallback-button" onClick={handleGoBack}>
                Go Back
            </button>
        </div>
    );
};

export default FallbackPage;