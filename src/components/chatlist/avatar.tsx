import React from 'react';

interface AvatarProps {
    image: string;
}

const Avatar: React.FC<AvatarProps> = ({ image }: AvatarProps) => {
    return (
        <div className="avatar">
            <div className="avatar-img">
                <img src={image} alt="#" />
            </div>
        </div>
    );
};

export default Avatar;
