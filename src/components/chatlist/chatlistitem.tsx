import React, { useEffect, useState } from 'react';
import Avatar from './avatar';
import avatar_default from '../../assets/avatar_default.jpg';
import { IConversationAttributes } from '../../interfaces/conversation/IConversationAttributes';
import { IChannelAttributes } from '../../interfaces/channel/IChannelAttributes';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ChatComponentType } from '../../state/component/chatComponent';

interface ChatListItemProps {
    animationDelay: number;
    active?: string;
    image?: string;
    item: IConversationAttributes | IChannelAttributes;
    itemType: ChatComponentType;
}
const ChatListItem: React.FC<ChatListItemProps> = ({
    animationDelay,
    /*  active, */
    image,
    item,
    itemType,
}: ChatListItemProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [itemName, setItemName] = useState<string>('');
    const authUsername = useSelector(
        (state: RootState) => state.authentication.user?.username
    );

    useEffect(() => {
        console.log('[ChatListItem] Activation main useEffect');

        if (itemName === '') {
            if (itemType === 'channels') {
                const copyItem = item as IChannelAttributes;

                setItemName(copyItem.name);

                return;
            }

            if (
                itemType === 'conversations' &&
                typeof authUsername === 'string'
            ) {
                const copyItem = item as IConversationAttributes;

                const user = copyItem.participants.filter(
                    (participant) => participant.username !== authUsername
                );

                if (user.length !== 0) {
                    setItemName(user[0].username);

                    return;
                }
            }

            setItemName('Undefined');
        }

        return () => {};
    }, [itemName, item, itemType, authUsername]);

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
