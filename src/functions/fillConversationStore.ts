import { AnyAction } from '@reduxjs/toolkit';

const fillConversationStore = async ({
    dispatch,
    token,
    userId,
}: {
    dispatch: React.Dispatch<AnyAction>;
    token: string;
    userId: number;
}): Promise<boolean> => {
    const response = await fetch(
        `http://localhost:8000/users/${userId}/conversations`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const json = await response.json();

    if (response.ok) {
        dispatch({
            type: 'conversations/setConversations',
            payload: json.data,
        });

        return true;
    }

    return false;
};

export default fillConversationStore;
