import React from 'react';
import Avatar from './avatar';
import avatar_default from '../../assets/avatar_default.jpg';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { IConversation } from '../../interfaces/conversation/IConversation';
import { IChannel } from '../../interfaces/channel/IChannel';

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
    const activeConversation = useSelector(
        (state: RootState) => state.chatComponent.activeConversation
    );

    const selectChat = (): void => {
        if (activeConversation === item.id) {
            dispatch({
                type: 'chatComponent/setActiveConversation',
                payload: {
                    activeConversation: null,
                    messages: [],
                },
            });
            return;
        }

        dispatch({
            type: 'chatComponent/setActiveConversation',
            payload: {
                activeConversation: item.id,
                messages: item.messages,
            },
        });
    };

    return (
        <div
            style={{ animationDelay: `0.${animationDelay}s` }}
            onClick={selectChat}
            className={`chatlist__item ${
                activeConversation === item.id ? 'active' : ''
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
