import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { activate } from "../../api/api";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ActivateAccount: React.FC = () => {
    const query = useQuery();
    const activationToken = query.get("token") ?? "null";
    const [message, setMessage] = useState<string>("Activate your account");
    const [success, setSuccess] = useState<null | boolean>(null);

    async function handleActivation() {
        try {
            setMessage("Activating your account...");
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await activate(activationToken);
            setSuccess(true);
            setMessage(response.message);
        } catch (error: any) {
            setSuccess(false);
            setMessage("Activation failed. Please try again later.");
        }
    }

    return (
        <div
            className="bg-base-variant dark:bg-darkmode-base-variant h-screen flex items-center justify-center text-text">
            <div className="bg-base dark:bg-darkmode-base shadow-md rounded-lg p-8 w-full max-w-md">
                <div className="text-center">
                    <h1 className={`text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100`}>{message}</h1>
                    <button
                        type="button"
                        onClick={handleActivation}
                        className="w-full py-3 bg-accent text-white rounded-lg hover:bg-focus-text focus:outline-none"
                    >
                        Activate
                    </button>
                    {success && (

                        <p className="p-4 font-bold text-text dark:text-darkmode-text">
                            Go to
                            <Link to="/signin" className="underline text-accent">
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
