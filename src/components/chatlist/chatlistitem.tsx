import React from 'react';
import Avatar from './avatar';
import avatar_default from '../../assets/avatar_default.jpg';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { IConversation } from '../../interfaces/conversation/IConversation';
import { IChannel } from '../../interfaces/channel/IChannel';
import { useNavigate } from 'react-router-dom';
import { IMessage } from '../../interfaces/message/IMessage';

interface ChatListItemProps {
    animationDelay: number;
    image?: string;
    item: IConversation | IChannel;
    itemName: string;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
    animationDelay,
    image,
    item,
    itemName,
}: ChatListItemProps) => {
    const dispatch = useDispatch();
    const activeConversationId = useSelector(
        (state: RootState) => state.chatComponent.activeConversationId
    );
    const chatComponentType = useSelector(
        (state: RootState) => state.chatComponent.type
    );
    const channels = useSelector((state: RootState) => state.channels.data);
    const conversations = useSelector(
        (state: RootState) => state.conversations.data
    );

    const navigate = useNavigate();

    const timeSinceLastMessage = (): string => {
        let canal: IChannel | IConversation | undefined;

        canal =
            chatComponentType === 'channels'
                ? channels.find((c) => c.id === item.id)
                : undefined;

        if (!canal) {
            canal =
                chatComponentType === 'conversations'
                    ? conversations.find((c) => c.id === item.id)
                    : undefined;

            if (!canal) {
                return '';
            }
        }

        const lastMessage: IMessage | undefined =
            canal.messages[canal.messages.length - 1];

        if (lastMessage) {
            const timeDifference =
                new Date().getTime() -
                new Date(lastMessage.created_at).getTime();

            const minutes = Math.floor(timeDifference / 60000);

            if (minutes < 1) {
                return "à l'instant";
            } else if (minutes === 1) {
                return 'il y a 1 minute';
            } else {
                return `il y a ${minutes} minutes`;
            }
        }

        return '';
    };

    const selectChat = (): void => {
        if (activeConversationId === item.id) {
            dispatch({
                type: 'chatComponent/setActiveConversation',
                payload: {
                    activeConversationId: 0,
                    activeConversationName: '',
                    messages: [],
                },
            });

            return;
        }

        return navigate(`/${chatComponentType}/${item.id}`);
    };

    return (
        <div
            style={{ animationDelay: `0.${animationDelay}s` }}
            onClick={selectChat}
            className={`chatlist__item ${
                activeConversationId === item.id ? 'active' : ''
            }`}
        >
            <Avatar image={image ? image : avatar_default} />

            <div className="userMeta">
                <p>{itemName}</p>
                <span className="activeTime">{timeSinceLastMessage()}</span>
            </div>
        </div>
    );
};

export default ChatListItem;
