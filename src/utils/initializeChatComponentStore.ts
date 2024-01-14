import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { handleLogout } from '../components/logout';
import { IChannel } from '../interfaces/channel/IChannel';
import { IConversation } from '../interfaces/conversation/IConversation';
import { IUser } from '../interfaces/user/IUser';

const initializeChatComponentStore = async (
    dispatch: Dispatch<AnyAction>,
    token: string | null,
    user?: IUser | null
): Promise<void> => {
    if (typeof token !== 'string') {
        return;
    }

    if (typeof user === 'undefined') {
        return;
    }

    if (user === null) {
        return;
    }

    try {
        const [fetchChannelsResponse, fetchConversationsResponse] =
            await Promise.all([
                fetch('http://localhost:8000/channels', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }),
                fetch(`http://localhost:8000/users/${user.id}/conversations`, {
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
            '/users/' + user.username + user.id,
        ];

        dispatch({
            type: 'mercure/setTopics',
            payload: {
                topics: topics,
            },
        });
    } catch (e) {
        handleLogout(dispatch, null, false);
        return;
    }
};

export default initializeChatComponentStore;
