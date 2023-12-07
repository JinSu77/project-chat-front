import { AnyAction } from '@reduxjs/toolkit';
import { ChatComponentType } from '../state/component/chatComponent';
import { handleLogout } from '../components/logout';

const fetchMessages = async (
    itemId: number | null,
    itemName: string,
    channelComponentType: ChatComponentType,
    dispatch: React.Dispatch<AnyAction>,
    token: string | null
): Promise<void> => {
    if (itemId === null || channelComponentType === null || token === null) {
        return;
    }

    let response;

    if (channelComponentType === 'channels') {
        response = await fetch(
            `http://localhost:8000/channels/${itemId}/messages`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    }

    if (channelComponentType === 'conversations') {
        response = await fetch(
            `http://localhost:8000/conversations/${itemId}/messages`,
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
        handleLogout(dispatch);
        return;
    }

    const json = await response.json();

    dispatch({
        type: 'chatComponent/setActiveConversation',
        payload: {
            activeConversation: itemId,
            activeConversationName: itemName,
            messages: json.data.messages,
        },
    });
};

export default fetchMessages;
