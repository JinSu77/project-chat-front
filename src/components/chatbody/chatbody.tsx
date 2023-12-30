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
    hasFetched: React.MutableRefObject<boolean>;
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

    const updateChatComponent = useCallback(async () => {
        if (paramIdRef.current !== undefined) {
            if (
                typeRef.current === 'channels' &&
                paramIdRef.current > channels.length - 1
            ) {
                paramIdRef.current = undefined;
            } else if (
                typeRef.current === 'conversations' &&
                paramIdRef.current > conversations.length - 1
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

        const getMessages = (type?: ChatComponentType): IMessage[] => {
            if (type === 'conversations') {
                const conversation: IConversation | undefined =
                    conversations.find((c) => c.id === paramIdRef.current);

                return conversation ? conversation.messages : [];
            }

            if (type === 'channels') {
                const channel: IChannel | undefined = channels.find(
                    (c) => c.id === paramIdRef.current
                );

                return channel ? channel.messages : [];
            }

            return [];
        };

        const activeConversationId = paramIdRef.current
            ? paramIdRef.current
            : 0;

        const item: IChannel | IConversation | undefined = getItem();

        const itemName: string = getItemName({
            item: item,
            authUsername: user?.username,
        });

        const messages: IMessage[] = getMessages(typeRef.current);

        dispatch({
            type: 'chatComponent/setActiveConversation',
            payload: {
                activeConversationId: activeConversationId,
                activeConversationName: itemName,
                messages: messages,
            },
        });
    }, [channels, conversations, user, dispatch]);

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

            dispatch({
                type: 'chatComponent/setChatComponentType',
                payload: {
                    type: typeRef.current,
                },
            });
        }

        const asyncUpdateChatComponent = async (): Promise<void> => {
            await updateChatComponent();
        };

        asyncUpdateChatComponent();
    }, [id, props.type, dispatch, updateChatComponent]);

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
