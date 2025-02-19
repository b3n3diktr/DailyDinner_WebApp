import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ApiUsers } from '../../api/apiUsers';

const Payments: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [subscription, setSubscription] = useState({
        plan: 'Free',
        renewalDate: 'N/A',
        status: 'Active',
    });

    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'Visa', last4: '1234', expiry: '12/25' },
    ]);

    const [billingHistory, setBillingHistory] = useState([
        { id: 1, date: '2024-01-10', amount: '€9.99', status: 'Paid' },
        { id: 2, date: '2023-12-10', amount: '€9.99', status: 'Paid' },
    ]);

    useEffect(() => {
        const loggedIn = Cookies.get('loggedIn');
        if (loggedIn !== 'true') {
            navigate('/signin');
        }

        const fetchData = async () => {
            try {
                const response = await ApiUsers.auth();
                setUsername(response.username);
            } catch (error) {
                navigate('/signin');
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="bg-base-variant dark:bg-darkmode-base-variant text-text dark:text-darkmode-text p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Payments & Billing</h2>

            {/* Subscription Details */}
            <div className="bg-neutral-light dark:bg-darkmode-neutral-light p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4">Subscription</h3>
                <p><strong>Plan:</strong> {subscription.plan}</p>
                <p><strong>Renewal Date:</strong> {subscription.renewalDate}</p>
                <p><strong>Status:</strong> {subscription.status}</p>
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded">Manage Subscription</button>
            </div>

            {/* Payment Methods */}
            <div className="bg-neutral-light dark:bg-darkmode-neutral-light p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
                {paymentMethods.map((method) => (
                    <div key={method.id} className="flex justify-between items-center border-b py-3">
                        <p>{method.type} **** {method.last4} (Exp: {method.expiry})</p>
                        <button className="text-red-500">Remove</button>
                    </div>
                ))}
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded">Add Payment Method</button>
            </div>

            {/* Payments History */}
            <div className="bg-neutral-light dark:bg-darkmode-neutral-light p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Billing History</h3>
                <ul>
                    {billingHistory.map((item) => (
                        <li key={item.id} className="flex justify-between border-b py-3">
                            <span>{item.date}</span>
                            <span>{item.amount}</span>
                            <span>{item.status}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Payments;
