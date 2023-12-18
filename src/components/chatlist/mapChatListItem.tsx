import { useSelector } from 'react-redux';
import { IChannel } from '../../interfaces/channel/IChannel';
import { IConversation } from '../../interfaces/conversation/IConversation';
import { RootState } from '../../store/store';
import ChatListItems from './chatlistitem';
import getItemName from '../../hooks/getItemName';

const MapChatListItem = ({
    data,
}: {
    data: IConversation[] | IChannel[];
}): JSX.Element => {
    const authUsername = useSelector(
        (state: RootState) => state.authentication.user?.username
    );

    return (
        <>
            {data.map((item, index) => (
                <ChatListItems
                    animationDelay={index + 1}
                    image={`https://i.pravatar.cc/?img=${index}`}
                    item={item}
                    itemName={getItemName({ item, authUsername })}
                    key={index}
                />
            ))}
        </>
    );
};

export default MapChatListItem;
