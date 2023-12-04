import './conversation.css';
import Nav from '../../components/nav/nav';
import ChatBody from '../../components/chatbody/chatbody';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import fillChannelStore from '../../functions/fillChannelStore';
import fillConversationStore from '../../functions/fillConversationStore';
import { handleLogout } from '../../components/logout';

export default function Conversation(): JSX.Element {
    const token = useSelector((state: RootState) => state.authentication.token);
    const user = useSelector((state: RootState) => state.authentication.user);
    const dispatch = useDispatch();
    const hasFetched = useRef<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const fetchAndFillStore = useCallback(
        async (userId: number, authToken: string): Promise<boolean> => {
            let success = await fillChannelStore({
                dispatch,
                token: authToken,
            });

            if (!success) {
                return false;
            }

            success = await fillConversationStore({
                dispatch,
                token: authToken,
                userId,
            });

            if (!success) {
                return false;
            }

            return true;
        },
        [dispatch]
    );

    useEffect(() => {
        console.log('[Conversation] UseEffect');

        if (!hasFetched.current && isLoading) {
            if (typeof token === 'string' && typeof user?.id === 'number') {
                fetchAndFillStore(user.id, token)
                    .then((success: boolean) => {
                        if (!success) {
                            handleLogout(dispatch);
                            return;
                        }

                        setIsLoading(false);
                    })
                    .catch((error: Error) => {
                        console.error(error);
                        handleLogout(dispatch);
                        return;
                    });

                hasFetched.current = true;
            }
        }

        return () => {};
    }, [dispatch, fetchAndFillStore, isLoading, token, user]);

    return (
        <div className="body-conversation">
            {isLoading === true ? (
                <div className="loading"></div>
            ) : (
                <div className="main-conv">
                    <Nav />

                    <ChatBody />
                </div>
            )}
        </div>
    );
}
