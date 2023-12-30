import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { handleLogout } from '../components/logout';
import { IChannel } from '../interfaces/channel/IChannel';
import { IConversation } from '../interfaces/conversation/IConversation';

const initializeChatComponentStore = async (
    dispatch: Dispatch<AnyAction>,
    token: string | null,
    userId?: number
): Promise<void> => {
    if (typeof token === 'string' && typeof userId === 'number') {
        const [fetchChannelsResponse, fetchConversationsResponse] =
            await Promise.all([
                fetch('http://localhost:8000/channels', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }),
                fetch(`http://localhost:8000/users/${userId}/conversations`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ]);

        if (!fetchChannelsResponse.ok || !fetchConversationsResponse.ok) {
            handleLogout(dispatch, null, false);
            return;
        }

        const [channelsJson, conversationsJson] = await Promise.all([
            fetchChannelsResponse.json(),
            fetchConversationsResponse.json(),
        ]);

        dispatch({
            type: 'channels/setChannels',
            payload: channelsJson.data,
        });

        dispatch({
            type: 'conversations/setConversations',
            payload: conversationsJson.data,
        });

        const topics = [
            ...(channelsJson.data.channels || []).map(
                (channel: IChannel) => `/channels/${channel.id}`
            ),
            ...(conversationsJson.data.conversations || []).map(
                (conversation: IConversation) =>
                    `/conversations/${conversation.id}`
            ),
        ];

        dispatch({
            type: 'mercure/setTopics',
            payload: {
                topics: topics,
            },
        });
    }
};

export default initializeChatComponentStore;
