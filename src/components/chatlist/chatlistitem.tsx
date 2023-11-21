import React, { useState } from 'react';
import Avatar from './avatar';

interface ChatListItemProps {
    animationDelay: number;
    active?: string;
    image?: string;
    name: string;
}
const ChatListItem: React.FC<ChatListItemProps> = ({
    animationDelay,
    /*  active, */
    image,
    name,
}: ChatListItemProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const selectChat = (): void => {
        setIsActive(true);
    };

    return (
        <div
            style={{ animationDelay: `0.${animationDelay}s` }}
            onClick={selectChat}
            className={`chatlist__item ${isActive ? 'active' : ''}`}
        >
            <Avatar image={image ? image : 'http://placehold.it/80x80'} />

            <div className="userMeta">
                <p>{name}</p>
                <span className="activeTime">32 mins ago</span>
            </div>
        </div>
    );
};

export default ChatListItem;
