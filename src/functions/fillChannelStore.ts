import { AnyAction } from '@reduxjs/toolkit';

const fillChannelStore = async ({
    dispatch,
    token,
}: {
    dispatch: React.Dispatch<AnyAction>;
    token: string;
}): Promise<boolean> => {
    const response = await fetch(`http://localhost:8000/channels`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    const json = await response.json();

    if (response.ok) {
        dispatch({
            type: 'channels/setChannels',
            payload: json.data,
        });

        return true;
    }

    return false;
};

export default fillChannelStore;
