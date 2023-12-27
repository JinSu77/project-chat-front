import './conversation.css';
import Nav from '../../components/nav/nav';
import ChatBody from '../../components/chatbody/chatbody';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { handleLogout } from '../../components/logout';
import { ChatComponentType } from '../../state/component/chatComponent';
import fetchStoreData from '../../utils/fetchStoreData';
import updateStoreData from '../../utils/updateStoreData';
import updateChatComponentMessageStore from '../../utils/updateChatComponentMessageStore';

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
    const actualProps = useRef<ChatComponentType>(props.type);
    const hasFetched = useRef<boolean>(false);

    const fillStore = useCallback(
        async (store: ChatComponentType, paramId?: number) => {
            if (typeof token === 'string' && typeof user?.id === 'number') {
                dispatch({
                    type: 'chatComponent/setChatComponentLoading',
                    payload: {
                        isLoading: true,
                    },
                });

                const response = await fetchStoreData(store, token, user?.id);

                if (!response || !response.ok) {
                    handleLogout(dispatch, null, false);
                    return;
                }

                const json = await response.json();

                updateStoreData(store, json.data, dispatch);

                dispatch({ type: 'chatComponent/resetToDefault' });

                dispatch({
                    type: 'chatComponent/setChatComponentType',
                    payload: {
                        type: store,
                    },
                });

                let data;

                if (json.data.channels !== undefined) {
                    data = json.data.channels;
                }

                if (json.data.conversations !== undefined) {
                    data = json.data.conversations;
                }

                if (data) {
                    await updateChatComponentMessageStore(
                        store,
                        data,
                        paramId,
                        dispatch,
                        token,
                        user?.username
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
        [dispatch, token, user?.id, user?.username]
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
