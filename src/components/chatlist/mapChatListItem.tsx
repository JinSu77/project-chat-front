import { useSelector } from 'react-redux';
import { IChannel } from '../../interfaces/channel/IChannel';
import { IConversation } from '../../interfaces/conversation/IConversation';
import { RootState } from '../../store/store';
import ChatListItems from './chatlistitem';

const MapChatListItem = ({
    data,
}: {
    data: IConversation[] | IChannel[];
}): JSX.Element => {
    const authUsername = useSelector(
        (state: RootState) => state.authentication.user?.username
    );

    const getItemName = (item: IConversation | IChannel): string => {
        if ('name' in item) {
            const copyItem = item as IChannel;

            return copyItem.name;
        }

        if ('participants' in item && typeof authUsername === 'string') {
            const copyItem = item as IConversation;

            const user = copyItem.participants.filter(
                (participant) => participant.username !== authUsername
            );

            if (user.length !== 0) {
                return user[0].username;
            }
        }

        return 'undefined';
    };

    return (
        <>
            {data.map((item, index) => (
                <ChatListItems
                    animationDelay={index + 1}
                    image={`https://i.pravatar.cc/?img=${index}`}
                    item={item}
                    itemName={getItemName(item)}
                    key={index}
                />
            ))}
        </>
    );
};

export default MapChatListItem;
