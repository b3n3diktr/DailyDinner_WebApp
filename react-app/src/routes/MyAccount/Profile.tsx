import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { auth, getProfilePicture, uploadProfilePicture } from "../../api/api";
import ProfilePicture from "./utils/ProfilPicture";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [uuid] = useState(Cookies.get('uuid') || "null");
    const [accountCreated, setAccountCreated] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (Cookies.get('loggedIn') !== "true") {
            navigate('/signin');
        } else {
            loadProfileData();
        }
    }, []);

    const loadProfileData = async () => {
        try {
            const response = await auth();
            setUsername(response.username);
            setEmail(response.email);
            setAccountCreated(response.accountCreated);
            await loadProfilePicture(uuid);
        } catch (error) {
            console.error("Failed to load profile data", error);
        }
    };

    const loadProfilePicture = async (uuid: string) => {
        try {
            if (uuid !== "null") {
                const response = await getProfilePicture(uuid);
                setProfilePictureUrl(response);
            }
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
                setSelectedFile(null);
            } catch (error) {
                console.error('Failed to upload profile picture', error);
            }
        }
    };

    return (
        <div className="bg-background-variant-1 dark:bg-darkmode-background-variant-1 text-text dark:text-darkmode-text p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                {/* Profile Picture */}
                <div className="relative w-32 h-32">
                    <ProfilePicture imageUrl={profilePictureUrl || ""} size="128px" />
                </div>

                {/* User Information */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold">{username}</h2>
                    <p className="text-sm text-text dark:text-darkmode-text">{email}</p>
                    <p className="text-sm mt-2">Account Created: {accountCreated}</p>
                </div>
            </div>

            {/* Upload Profile Picture */}
            <div className="mt-8 flex flex-col items-center md:items-start">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profile-upload"
                />
                <label
                    htmlFor="profile-upload"
                    className="bg-primary dark:bg-darkmode-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-variant dark:hover:bg-darkmode-primary-variant transition"
                >
                    Choose File
                </label>
                {selectedFile && (
                    <button
                        onClick={handleUpload}
                        className="mt-4 bg-accent dark:bg-darkmode-accent text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
                    >
                        Upload
                    </button>
                )}
            </div>

            {/* Additional Information */}
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
