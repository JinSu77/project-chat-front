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

        const conversationsAttributes = channels.map((channel: IChannel) => {
            return {
                id: channel.id,
                name: channel.name,
            };
        });

        dispatch({
            type: 'chatComponent/setChatComponent',
            payload: {
                data: conversationsAttributes,
                type: type,
            },
        });
    }

    if (type === 'conversations') {
        const conversations = data as IConversation[];

        const formattedData = conversations.map(
            (conversation: IConversation) => {
                return {
                    id: conversation.id,
                    type: conversation.type,
                    participants: conversation.participants.map(
                        (participant) => {
                            return {
                                id: participant.id,
                                username: participant.username,
                            };
                        }
                    ),
                };
            }
        );

        dispatch({
            type: 'chatComponent/setChatList',
            payload: {
                data: formattedData,
                type: type,
            },
        });
    }
};

export default fillChatComponentStore;
