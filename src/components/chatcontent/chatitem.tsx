import React from 'react';
import Avatar from '../chatlist/avatar';
import { IMessage } from '../../interfaces/message/IMessage';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import './chatcontent.css';

interface ChatItemProps {
    image: string;
    animationDelay: number;
    message: IMessage;
}
const ChatItem: React.FC<ChatItemProps> = ({
    animationDelay,
    image,
    message,
}: ChatItemProps) => {
    const authenticatedUser = useSelector(
        (state: RootState) => state.authentication.user
    );

    const isMyMessage = (): boolean => {
        return message.user_id === authenticatedUser?.id;
    };

    return (
        <div
            style={{ animationDelay: `0.${animationDelay}s` }}
            className={`${
                isMyMessage() === true ? 'chat__item' : 'chat__item other'
            }`}
        >
            <div className="chat__item__content">
                <div className="chat__content">{message.content}</div>
                <div className="chat__meta">
                    <p>{message.username}</p>
                    <span>{message.created_at.toString()}</span>
                    {/* <span>{message.received_at ? 'Reçu' : 'Envoyé'}</span>     */}
                </div>
            </div>
            <Avatar image={image} />
        </div>
    );
};

export default ChatItem;
