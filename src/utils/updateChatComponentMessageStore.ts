import { Dispatch } from 'react';
import { IChannel } from '../interfaces/channel/IChannel';
import { IConversation } from '../interfaces/conversation/IConversation';
import { ChatComponentType } from '../state/component/chatComponent';
import fetchMessages from './fetchMessages';
import getItemName from './getItemName';
import { AnyAction } from '@reduxjs/toolkit';

const updateChatComponentMessageStore = async (
    store: ChatComponentType,
    data: IChannel[] | IConversation[],
    paramId: number | undefined,
    dispatch: Dispatch<AnyAction>,
    token: string,
    authUsername?: string
): Promise<void> => {
    let changeUrlTo;
    let entity: IChannel | IConversation | undefined;

    if (store === 'channels') {
        const channels: IChannel[] = data as IChannel[];

        if (channels.length > 0) {
            const channelId: number =
                typeof paramId === 'number' &&
                channels.some(
                    (channel: { id: number }) => channel.id === paramId
                )
                    ? paramId
                    : channels[0].id;

            entity = channels.find(
                (channel: { id: number }) => channel.id === channelId
            ) as IChannel;

            changeUrlTo = `/channels/${channelId}`;
        }
    }

    if (store === 'conversations') {
        const conversations: IConversation[] = data as IConversation[];

        if (conversations.length > 0) {
            const conversationId: number =
                typeof paramId === 'number' &&
                conversations.some(
                    (conversation: { id: number }) =>
                        conversation.id === paramId
                )
                    ? paramId
                    : conversations[0].id;

            entity = conversations.find(
                (conversation: { id: number }) =>
                    conversation.id === conversationId
            ) as IConversation;

            changeUrlTo = `/conversations/${conversationId}`;
        }
    }

    if (entity) {
        await fetchMessages(
            entity.id,
            getItemName({
                item: entity,
                authUsername: authUsername,
            }),
            store,
            dispatch,
            token
        );

        if (changeUrlTo) {
            window.history.replaceState(null, '', changeUrlTo);
        }
    }
};

export default updateChatComponentMessageStore;
