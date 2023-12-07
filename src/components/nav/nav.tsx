import logo from '../../assets/login/logo-chat.png';
import './nav.css';
import Logout, { handleLogout } from '../logout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useCallback, useEffect, useRef } from 'react';

export default function Nav(): JSX.Element {
    const dispatch = useDispatch();
    const chatComponentType = useSelector(
        (state: RootState) => state.chatComponent.type
    );
    const user = useSelector((state: RootState) => state.authentication.user);
    const token = useSelector((state: RootState) => state.authentication.token);
    const hasFetched = useRef<boolean>(false);
    const actualChatComponentType = useRef<string | null>(null);

    const fillStore = useCallback(
        async (store: 'conversations' | 'channels') => {
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
            }
        },
        [dispatch, token, user?.id]
    );

    useEffect(() => {
        console.log('[Nav] UseEffect');

        if (hasFetched.current === false && chatComponentType === null) {
            fillStore('channels');

            actualChatComponentType.current = 'channels';

            hasFetched.current = true;

            return;
        }

        if (hasFetched.current === false && chatComponentType !== null) {
            fillStore(chatComponentType);

            actualChatComponentType.current = chatComponentType;

            hasFetched.current = true;

            return;
        }

        if (
            chatComponentType !== null &&
            chatComponentType !== actualChatComponentType.current
        ) {
            fillStore(chatComponentType);

            actualChatComponentType.current = chatComponentType;
        }
    }, [chatComponentType, dispatch, fillStore]);

    const setChatComponentStore = (
        e: React.MouseEvent<HTMLButtonElement>
    ): void => {
        e.preventDefault();

        dispatch({
            type: 'chatComponent/setChatComponentType',
            payload: {
                type: e.currentTarget.value,
            },
        });

        dispatch({
            type: 'chatComponent/setActiveConversation',
            payload: {
                activeConversationId: 0,
                activeConversationName: '',
                messages: [],
            },
        });
    };

    return (
        <>
            <ul className="nav">
                <li>
                    <img src={logo} alt="logo" />
                </li>

                <li>
                    <button onClick={setChatComponentStore} value={'channels'}>
                        Channel
                    </button>
                </li>

                <li>
                    <button
                        onClick={setChatComponentStore}
                        value={'conversations'}
                    >
                        Conversation
                    </button>
                </li>

                <li>
                    <Logout />
                </li>
            </ul>
        </>
    );
}
