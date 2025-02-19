import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { ApiUsers } from "../../api/apiUsers";
import ProfilePicture from "./utils/ProfilPicture";
import { useNavigate } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

interface ProfileProps {
    username: string;
    email: string;
    uuid: string;
    imageUrl?: string;
}

const Profile: React.FC<ProfileProps> = ({username, email, uuid, imageUrl}) => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                await ApiUsers.uploadProfilePicture(uuid, selectedFile);
                await ApiUsers.getProfilePicture(uuid);
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
                    <ProfilePicture imageUrl={imageUrl || ""} size="128px" />
                </div>

                {/* User Information */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold">{username}</h2>
                    <p className="text-sm text-text dark:text-darkmode-text">{email}</p>
                    <p className="text-sm mt-2">Account Created: 01.01.2000</p>
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
