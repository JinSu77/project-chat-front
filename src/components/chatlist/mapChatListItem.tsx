import { useSelector } from 'react-redux';
import { IChannel } from '../../interfaces/channel/IChannel';
import { IConversation } from '../../interfaces/conversation/IConversation';
import { RootState } from '../../store/store';
import ChatListItems from './chatlistitem';
import getItemName from '../../utils/getItemName';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const MapChatListItem = ({
    data,
}: {
    data: IConversation[] | IChannel[];
}): JSX.Element => {
    const authUsername = useSelector(
        (state: RootState) => state.authentication.user?.username
    );
    const chatComponentType = useSelector(
        (state: RootState) => state.chatComponent.type
    );
    const activeConversationId = useSelector((state: RootState) => {
        return state.chatComponent.activeConversationId;
    });
    const channelComponentType = useSelector((state: RootState) => {
        return state.chatComponent.type;
    });

    const navigate = useNavigate();
    const actualConversationId = useRef<number>(activeConversationId);

    useEffect(() => {
        console.log('[MapChatListItem] UseEffect');

        if (activeConversationId === 0 && actualConversationId.current !== 0) {
            actualConversationId.current = 0;

            return navigate(`/${channelComponentType}`);
        } else if (activeConversationId !== 0) {
            actualConversationId.current = activeConversationId;
        }
    }, [activeConversationId, channelComponentType, navigate]);

    return (
        <>
            {data.map((item, index) => (
                <Link to={`/${chatComponentType}/${item.id}`} key={index}>
                    <ChatListItems
                        animationDelay={index + 1}
                        image={`https://i.pravatar.cc/?img=${index}`}
                        item={item}
                        itemName={getItemName({ item, authUsername })}
                        key={index}
                    />
                </Link>
            ))}
        </>
    );
};

export default MapChatListItem;
