import React, { useEffect, useState } from 'react';
import '../../../style.css';
import Cookies from "js-cookie";
import {auth, getProfilePicture, uploadProfilePicture} from "../../../api/api";
import ProfilePicture from "./utils/ProfilPicture";
import {useNavigate} from "react-router-dom";

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [uuid, setUuid] = useState('');
    const [accountCreated, setAccountCreated] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const loggedIn = Cookies.get('loggedIn');
        if (loggedIn != "true") {
            navigate('/signin');
        }
    }, []);

    const loadProfilePicture = async (uuid: string) => {
        try {
            const response = await getProfilePicture(uuid);
            setProfilePictureUrl(response);
        } catch (error) {
            console.error('Failed to load profile picture', error);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                await uploadProfilePicture(uuid, selectedFile);
                await loadProfilePicture(uuid);
            } catch (error) {
                console.error('Failed to upload profile picture', error);
            }
        }
    };

    return (
        <div
            className="bg-base-variant dark:bg-darkmode-base-variant text-text dark:text-darkmode-text p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                {/* Profile Picture */}
                <div className="w-32 h-32 relative rounded-full">
                    <ProfilePicture imageUrl={profilePictureUrl || ""} size="150px"/>
                </div>

                {/* Basic Information */}
                <div className="flex flex-col space-y-4 text-center md:text-left">
                    <div>
                        <h2 className="text-2xl font-bold">{username}</h2>
                        <p className="text-sm text-text-variant dark:text-darkmode-text-variant">{email}</p>
                    </div>
                    <div>
                        <p className="text-sm">Account Created: {accountCreated}</p>
                    </div>
                </div>
            </div>

            {/* Upload Profile Picture */}
            <div className="mt-8 ">
                <input type="file" accept="image/*" onChange={handleFileChange}/>
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 text-white px-2 py-1 rounded mt-2">
                    Upload
                </button>
            </div>

            {/* Additional Details */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="font-semibold">Phone Number:</p>
                        <p className="text-sm">+1 123 456 7890</p>
                    </div>
                    <div>
                        <p className="font-semibold">Address:</p>
                        <p className="text-sm">Musterstraße 1A, 12345, Berlin, Deutschland</p>
                    </div>
                    <div>
                        <p className="font-semibold">Subscription Plan:</p>
                        <p className="text-sm">Free</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;
