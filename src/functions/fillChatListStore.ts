import { AnyAction } from '@reduxjs/toolkit';
import { IConversation } from '../interfaces/conversation/IConversation';
import { IChannel } from '../interfaces/channel/IChannel';

const fillChatListStore = async ({
    dispatch,
    json,
    type,
}: {
    dispatch: React.Dispatch<AnyAction>;
    json: {
        data:
            | {
                  channels: IChannel[];
              }
            | {
                  conversations: IConversation[];
              };
    };
    type: 'conversations' | 'channels';
}): Promise<void> => {
    if (type === 'channels' && 'channels' in json.data) {
        const formattedData = json.data.channels.map((channel: IChannel) => {
            return {
                id: channel.id,
                name: channel.name,
            };
        });

        dispatch({
            type: 'chatList/setChatList',
            payload: {
                data: formattedData,
                type: type,
            },
        });
    }

    if (type === 'conversations' && 'conversations' in json.data) {
        const formattedData = json.data.conversations.map(
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
            type: 'chatList/setChatList',
            payload: {
                data: formattedData,
                type: type,
            },
        });
    }
};

export default fillChatListStore;
