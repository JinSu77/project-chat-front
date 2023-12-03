import { AnyAction } from '@reduxjs/toolkit';
import { IConversation } from '../interfaces/conversation/IConversation';
import { IChannel } from '../interfaces/channel/IChannel';

const fillChatComponentStore = async ({
    dispatch,
    data,
    type,
}: {
    dispatch: React.Dispatch<AnyAction>;
    data: IChannel[] | IConversation[];
    type: 'conversations' | 'channels';
}): Promise<void> => {
    if (type === 'channels') {
        const channels = data as IChannel[];

        dispatch({
            type: 'chatComponent/setChatComponent',
            payload: {
                data: channels,
                type: type,
            },
        });
    } else if (type === 'conversations') {
        const conversations = data as IConversation[];

        dispatch({
            type: 'chatComponent/setChatComponent',
            payload: {
                data: conversations,
                type: type,
            },
        });
    }
};

export default fillChatComponentStore;
