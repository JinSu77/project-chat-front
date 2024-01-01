import { useCallback, useEffect, useRef } from 'react';
import ChatContent from '../chatcontent/chatcontent';
import ChatList from '../chatlist/chatlist';
/* import UserProfile from '../userprofile/userprofile'; */
import './chatbody.css';
import { ChatComponentType } from '../../state/component/chatComponent';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IMessage } from '../../interfaces/message/IMessage';
import { IChannel } from '../../interfaces/channel/IChannel';
import { IConversation } from '../../interfaces/conversation/IConversation';
import getItemName from '../../utils/getItemName';

type ChatBodyProps = {
    type: ChatComponentType;
};

export default function ChatBody(props: ChatBodyProps): JSX.Element {
    const channels = useSelector((state: RootState) => state.channels.data);
    const conversations = useSelector(
        (state: RootState) => state.conversations.data
    );
    const user = useSelector((state: RootState) => state.authentication.user);

    const { id } = useParams<{ id: string | undefined }>();
    const dispatch = useDispatch();

    const paramIdRef = useRef<number | undefined>();
    const typeRef = useRef<ChatComponentType | undefined>();
    const autoSelectRef = useRef<boolean>(true);

    const updateChatComponent = useCallback(async () => {
        dispatch({
            type: 'chatComponent/setChatComponentType',
            payload: {
                type: typeRef.current,
            },
        });

        if (paramIdRef.current !== undefined) {
            const existInChannels: boolean = channels.some(
                (c) => c.id === paramIdRef.current
            );

            const existInConversations: boolean = conversations.some(
                (c) => c.id === paramIdRef.current
            );

            if (typeRef.current === 'channels' && existInChannels === false) {
                paramIdRef.current = undefined;
            } else if (
                typeRef.current === 'conversations' &&
                existInConversations === false
            ) {
                paramIdRef.current = undefined;
            }
        }

        const getItem = (): IChannel | IConversation | undefined => {
            if (typeRef.current === 'channels') {
                return channels.find(
                    (channel) => channel.id === paramIdRef.current
                );
            }

            if (typeRef.current === 'conversations') {
                return conversations.find(
                    (conversation) => conversation.id === paramIdRef.current
                );
            }

            return undefined;
        };

        const getMessages = (
            itemId: number,
            type?: ChatComponentType
        ): IMessage[] => {
            if (type === 'conversations') {
                const conversation: IConversation | undefined =
                    conversations.find((c) => c.id === itemId);

                return conversation ? conversation.messages : [];
            }

            if (type === 'channels') {
                const channel: IChannel | undefined = channels.find(
                    (c) => c.id === itemId
                );

                return channel ? channel.messages : [];
            }

            return [];
        };

        const item: IChannel | IConversation | undefined = getItem();

        const activeConversationId: number = item?.id ?? 0;

        const itemName: string = getItemName({
            item: item,
            authUsername: user?.username,
        });

        const messages: IMessage[] = getMessages(
            activeConversationId,
            typeRef.current
        );

        window.history.replaceState(
            null,
            '',
            activeConversationId !== 0
                ? `/${typeRef.current}/${activeConversationId}`
                : `/${typeRef.current}`
        );

        dispatch({
            type: 'chatComponent/setActiveConversation',
            payload: {
                activeConversationId: activeConversationId,
                activeConversationName: itemName,
                messages: messages,
            },
        });
    }, [channels, conversations, user, dispatch]);

    const selectFirstChannelOrConversation = useCallback(async () => {
        if (typeRef.current === 'channels') {
            if (channels.length === 0) {
                return;
            }

            const firstChannel: IChannel = channels[0];

            paramIdRef.current = firstChannel.id;

            await updateChatComponent();
        }

        if (typeRef.current === 'conversations') {
            if (conversations.length === 0) {
                return;
            }

            const firstConversation: IConversation = conversations[0];

            paramIdRef.current = firstConversation.id;

            await updateChatComponent();
        }
    }, [channels, conversations, updateChatComponent]);

    useEffect(() => {
        console.log('[ChatBody] UseEffect');

        const parsedParamId =
            typeof id === 'string' && !isNaN(parseInt(id))
                ? parseInt(id)
                : undefined;

        if (paramIdRef.current !== parsedParamId) {
            paramIdRef.current = parsedParamId;
        }

        if (typeRef.current !== props.type) {
            typeRef.current = props.type;

            autoSelectRef.current = true;
        }

        const asyncUpdateChatComponent = async (): Promise<void> => {
            await updateChatComponent();

            if (autoSelectRef.current) {
                await selectFirstChannelOrConversation();

                autoSelectRef.current = false;
            }
        };

        asyncUpdateChatComponent();
    }, [
        id,
        props.type,
        dispatch,
        updateChatComponent,
        selectFirstChannelOrConversation,
    ]);

    return (
        <div className="main_chatbody">
            <ChatList
                channels={channels}
                conversations={conversations}
                type={props.type}
            />
            <ChatContent />
            {/* <UserProfile /> */}
        </div>
    );
}
