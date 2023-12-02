import React, { useEffect, useState } from 'react';
import Avatar from './avatar';
import avatar_default from '../../assets/avatar_default.jpg';
import { IConversationAttributes } from '../../interfaces/conversation/IConversationAttributes';
import { IChannelAttributes } from '../../interfaces/channel/IChannelAttributes';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

interface ChatListItemProps {
    animationDelay: number;
    active?: string;
    image?: string;
    item: IConversationAttributes | IChannelAttributes;
}
const ChatListItem: React.FC<ChatListItemProps> = ({
    animationDelay,
    /*  active, */
    image,
    item,
}: ChatListItemProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [itemName, setItemName] = useState<string>('');
    const authUsername = useSelector(
        (state: RootState) => state.authentication.user?.username
    );

    useEffect(() => {
        if ('name' in item) {
            setItemName(item.name);

            return () => {};
        } else if (typeof authUsername === 'string') {
            const user = item.participants.filter(
                (participant) => participant.username !== authUsername
            );

            if (user.length !== 0) {
                setItemName(user[0].username);

                return () => {};
            }
        }

        setItemName('undefined');

        return () => {};
    }, [item, authUsername]);

    const selectChat = (): void => {
        setIsActive(true);
    };

    return (
        <div
            style={{ animationDelay: `0.${animationDelay}s` }}
            onClick={selectChat}
            className={`chatlist__item ${isActive ? 'active' : ''}`}
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
