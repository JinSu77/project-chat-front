import React from 'react';
import Avatar from '../chatlist/avatar';

interface ChatItemProps {
    msg: string;
    image: string;
    animationDelay: number;
    id: number;
    content: string;
    conversation_id?: number;
    user_id?: number;
    created_at?: number;
    received_at?: null;
    channel?: null;
}
const ChatItem: React.FC<ChatItemProps> = ({
    msg,
    content,
    animationDelay,
    image,
    id,
    received_at,
    created_at,
}: ChatItemProps) => {
    return (
        <div
            style={{ animationDelay: `0.${animationDelay}s` }}
            className={`chat__item ${id ? id : ''}`}
        >
            <div className="chat__item__content">
                <div className="chat__msg">{msg}</div>
                <div className="chat__content">{content}</div>
                <div className="chat__meta">
                    <span>{received_at}</span>
                    <span>{created_at}</span>
                </div>
            </div>
            <Avatar image={image} />
        </div>
    );
};

export default ChatItem;
