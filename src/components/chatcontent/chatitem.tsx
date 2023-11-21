import React from 'react';
import Avatar from '../chatlist/avatar';

interface ChatItemProps {
    user: string;
    msg: string;
    image: string;
    animationDelay: number;
}

const ChatItem: React.FC<ChatItemProps> = ({
    user,
    msg,
    image,
    animationDelay,
}: ChatItemProps) => {
    return (
        <div
            style={{ animationDelay: `0.${animationDelay}s` }}
            className={`chat__item ${user ? user : ''}`}
        >
            <div className="chat__item__content">
                <div className="chat__msg">{msg}</div>
                <div className="chat__meta">
                    <span>16 mins ago</span>
                    <span>Seen 1.03PM</span>
                </div>
            </div>
            <Avatar image={image} />
        </div>
    );
};

export default ChatItem;
