import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ApiUsers } from "../../api/apiUsers";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const encodeQueryParams = (params: Record<string, string>) => {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
};

const ActivateAccount: React.FC = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const activationToken = query.get("token");
    const [message, setMessage] = useState<string>("Activate your account");
    const [success, setSuccess] = useState<null | boolean>(null);

    useEffect(() => {
        if (!activationToken) {
            const params = encodeQueryParams({
                errorCode: '400',
                message: 'Invalid activation token.',
                header: 'Error'
            });
            navigate(`/fallback?${params}`, { replace: true });
        }
    }, [activationToken, navigate]);

    async function handleActivation() {
        try {
            setMessage("Activating your account...");
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await ApiUsers.activate(activationToken || "");
            setSuccess(true);
            setMessage(response.message);
        } catch (error: any) {
            setSuccess(false);
            setMessage("Activation failed. Please try again later.");
        }
    }

    if (!activationToken) {
        return null;
    }

    return (
        <div
            className="bg-background-variant-1 dark:bg-darkmode-background-variant-1 h-screen flex items-center justify-center text-text dark:text-darkmode-text"
        >
            <div className="bg-background dark:bg-darkmode-background shadow-md rounded-lg p-8 w-full max-w-md">
                <div className="text-center">
                    <h1 className="text-lg font-semibold mb-4 text-text dark:text-darkmode-text">
                        {message}
                    </h1>
                    <button
                        type="button"
                        onClick={handleActivation}
                        className="w-full py-3 bg-primary text-text dark:text-darkmode-text rounded-lg hover:bg-primary-variant focus:outline-none transition-colors duration-200"
                    >
                        Activate
                    </button>
                    {success && (
                        <p className="p-4 font-bold text-text dark:text-darkmode-text">
                            Go to{" "}
                            <Link
                                to="/signin"
                                className="underline text-primary hover:text-primary-variant dark:text-primary dark:hover:text-primary-variant transition-colors duration-200"
                            >
                                Login
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivateAccount;