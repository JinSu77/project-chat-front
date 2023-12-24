import './conversation.css';
import Nav from '../../components/nav/nav';
import ChatBody from '../../components/chatbody/chatbody';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { handleLogout } from '../../components/logout';
import fetchMessages from '../../hooks/fetchMessages';
import getItemName from '../../hooks/getItemName';

type ConversationProps = {
    type: 'conversations' | 'channels';
};

export default function Conversation(props: ConversationProps): JSX.Element {
    const chatComponentType = useSelector(
        (state: RootState) => state.chatComponent.type
    );
    const user = useSelector((state: RootState) => state.authentication.user);
    const token = useSelector((state: RootState) => state.authentication.token);
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string | undefined }>();
    const actualChatComponentType = useRef<string | null>(chatComponentType);
    const actualProps = useRef<'conversations' | 'channels'>(props.type);
    const hasFetched = useRef<boolean>(false);

    const fillStore = useCallback(
        async (store: 'conversations' | 'channels', paramId?: number) => {
            if (typeof token === 'string' && typeof user?.id === 'number') {
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
                        `http://localhost:8000/users/${user.id}/conversations`,
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

                dispatch({ type: 'chatComponent/resetToDefault' });

                dispatch({
                    type: 'chatComponent/setChatComponentType',
                    payload: {
                        type: store,
                    },
                });

                if (store === 'channels' && json.data.channels.length > 0) {
                    const channelId: number =
                        typeof paramId === 'number' &&
                        json.data.channels.some(
                            (channel: { id: number }) => channel.id === paramId
                        )
                            ? id
                            : json.data.channels[0].id;

                    fetchMessages(
                        channelId,
                        getItemName({
                            item: json.data.channels.find(
                                (channel: { id: number }) =>
                                    channel.id === channelId
                            ),
                            authUsername: user?.username,
                        }),
                        store,
                        dispatch,
                        token
                    );

                    window.history.replaceState(
                        null,
                        '',
                        `/channels/${channelId}`
                    );
                } else if (
                    store === 'conversations' &&
                    json.data.conversations.length > 0
                ) {
                    const conversationId: number =
                        typeof paramId === 'number' &&
                        json.data.conversations.some(
                            (conversation: { id: number }) =>
                                conversation.id === paramId
                        )
                            ? id
                            : json.data.conversations[0].id;

                    fetchMessages(
                        conversationId,
                        getItemName({
                            item: json.data.conversations.find(
                                (conversation: { id: number }) =>
                                    conversation.id === conversationId
                            ),
                            authUsername: user?.username,
                        }),
                        store,
                        dispatch,
                        token
                    );

                    window.history.replaceState(
                        null,
                        '',
                        `/conversations/${conversationId}`
                    );
                }

                dispatch({
                    type: 'chatComponent/setChatComponentLoading',
                    payload: {
                        isLoading: false,
                    },
                });
            }
        },
        [dispatch, id, token, user?.id, user?.username]
    );

    useEffect(() => {
        console.log('[Conversation] UseEffect');

        const paramId: number | undefined =
            typeof id === 'string' && !isNaN(parseInt(id))
                ? parseInt(id)
                : undefined;

        if (hasFetched.current === false) {
            fillStore(props.type, paramId);

            actualChatComponentType.current = chatComponentType;

            actualProps.current = props.type;

            hasFetched.current = true;

            return;
        }

        if (hasFetched.current === true && props.type !== actualProps.current) {
            fillStore(props.type, paramId);

            actualChatComponentType.current = chatComponentType;

            actualProps.current = props.type;

            return;
        }
    }, [chatComponentType, fillStore, id, props.type]);

    return (
        <div className="body-conversation">
            <div className="main-conv">
                <Nav />
                <ChatBody />
            </div>
        </div>
    );
}
