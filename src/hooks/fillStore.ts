import { AnyAction } from '@reduxjs/toolkit';
import { handleLogout } from '../components/logout';

const fillStore = async (
    dispatch: React.Dispatch<AnyAction>,
    token: string,
    userId: number,
    store: 'channels' | 'conversations'
): Promise<void> => {
    dispatch({
        type: 'chatComponent/setChatComponentLoading',
        payload: {
            isLoading: true,
        },
    });

    let response;

    if (store === 'channels') {
        response = await fetch(`http://localhost:8000/channels`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    if (store === 'conversations') {
        response = await fetch(
            `http://localhost:8000/users/${userId}/conversations`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    }

    if (!response || !response.ok) {
        handleLogout(dispatch, null, false);
        return;
    }

    const json = await response.json();

    if (store === 'channels') {
        dispatch({
            type: 'channels/setChannels',
            payload: json.data,
        });
    }

    if (store === 'conversations') {
        dispatch({
            type: 'conversations/setConversations',
            payload: json.data,
        });
    }

    dispatch({
        type: 'chatComponent/setChatComponentType',
        payload: {
            type: store,
        },
    });

    dispatch({
        type: 'chatComponent/setChatComponentLoading',
        payload: {
            isLoading: false,
        },
    });
};

export default fillStore;
