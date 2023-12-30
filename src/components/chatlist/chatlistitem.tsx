import React from 'react';
import Avatar from './avatar';
import avatar_default from '../../assets/avatar_default.jpg';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { IConversation } from '../../interfaces/conversation/IConversation';
import { IChannel } from '../../interfaces/channel/IChannel';
import { useNavigate } from 'react-router-dom';

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
    const channelComponentType = useSelector(
        (state: RootState) => state.chatComponent.type
    );

    const navigate = useNavigate();

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

        return navigate(`/${channelComponentType}/${item.id}`);
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
                <span className="activeTime">32 mins ago</span>
            </div>
        </div>
    );
};

export default ChatListItem;
