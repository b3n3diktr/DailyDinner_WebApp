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

    const hideErrorCode = ['201'];

    return (
        <div className="wrapper">
        <div className="wrapper-main">
            <h1>{header}</h1>
            <p>{message}</p>
            {errorCode && !hideErrorCode.includes(errorCode) && (
                <p >Error Code: {errorCode}</p>
            )}
            <button onClick={handleGoBack}>
                Go Back
            </button>
        </div>
        </div>
    );
};

export default FallbackPage;