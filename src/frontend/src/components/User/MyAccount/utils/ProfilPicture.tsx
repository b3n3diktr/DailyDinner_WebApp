import React from 'react';

interface ProfilePictureProps {
    imageUrl: string;
    size?: string; // Optional size prop to control the circle size
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ imageUrl, size = '150' }) => {
    return (
        <div
            className="rounded-full overflow-hidden border-2 border-gray-300">
            <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default ProfilePicture;
