import { ChatComponentType } from '../state/component/chatComponent';

const fetchStoreData = async (
    store: ChatComponentType,
    token: string,
    userId?: number
): Promise<Response> => {
    return await fetch(
        store === 'channels'
            ? 'http://localhost:8000/channels'
            : `http://localhost:8000/users/${userId}/conversations`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export default fetchStoreData;
