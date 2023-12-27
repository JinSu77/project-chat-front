import { Dispatch } from 'react';
import { IChannel } from '../interfaces/channel/IChannel';
import { IConversation } from '../interfaces/conversation/IConversation';
import { ChatComponentType } from '../state/component/chatComponent';
import { AnyAction } from '@reduxjs/toolkit';

const updateStoreData = (
    store: ChatComponentType,
    data: IChannel[] | IConversation[],
    dispatch: Dispatch<AnyAction>
): void => {
    const actionType: string =
        store === 'channels'
            ? 'channels/setChannels'
            : 'conversations/setConversations';

    dispatch({
        type: actionType,
        payload: data,
    });
};

export default updateStoreData;
