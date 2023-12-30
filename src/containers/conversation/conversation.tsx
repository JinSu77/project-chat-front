import './conversation.css';
import Nav from '../../components/nav/nav';
import ChatBody from '../../components/chatbody/chatbody';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import initializeChatComponentStore from '../../utils/initializeChatComponentStore';

type ConversationProps = {
    type: 'conversations' | 'channels';
};

export default function Conversation(props: ConversationProps): JSX.Element {
    const token = useSelector((state: RootState) => state.authentication.token);
    const user = useSelector((state: RootState) => state.authentication.user);

    const dispatch = useDispatch();

    const hasFetched = useRef<boolean>(false);

    const initChatComponentStore = useCallback(async () => {
        dispatch({ type: 'chatComponent/resetToDefault' });

        dispatch({
            type: 'chatComponent/setChatComponentLoading',
            payload: {
                isLoading: true,
            },
        });

        await initializeChatComponentStore(
            dispatch,
            token,
            user?.id,
        );

        dispatch({
            type: 'chatComponent/setChatComponentType',
            payload: {
                type: props.type,
            },
        });

        dispatch({
            type: 'chatComponent/setChatComponentLoading',
            payload: {
                isLoading: false,
            },
        });
    }, [dispatch, token, user, props.type]);

    useEffect(() => {
        console.log('[Conversation] UseEffect');

        if (hasFetched.current === false) {
            console.log('[Conversation] UseEffect - first fetch');

            const asyncInitChatComponentStore = async (): Promise<void> => {
                await initChatComponentStore();
            };

            asyncInitChatComponentStore();

            hasFetched.current = true;

            return;
        }
    }, [initChatComponentStore]);

    return (
        <div className="body-conversation">
            <div className="main-conv">
                <Nav />
                <ChatBody hasFetched={hasFetched} type={props.type} />
            </div>
        </div>
    );
}
