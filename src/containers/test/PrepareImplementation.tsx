import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import '../dashboard/dashboard.css';
import { useEffect, useRef } from 'react';
import { IMessage } from '../../interfaces/message/IMessage';
import { selectMessagesByChannelId } from '../../state/channels/channels';
import fillChannelStore from '../../functions/fillChannelStore';
import fillConversationStore from '../../functions/fillConversationStore';
import { selectMessagesByConversationId } from '../../state/conversations/conversations';
import Logout from '../../components/logout';

export default function PrepareImplementation(): JSX.Element {
    const channels = useSelector((state: RootState) => state.channels.data);
    const conversations = useSelector(
        (state: RootState) => state.conversations.data
    );
    const channelMessages: IMessage[] = useSelector(
        selectMessagesByChannelId(1)
    );
    const conversationMessages: IMessage[] = useSelector(
        selectMessagesByConversationId(1)
    );
    const isLoggedIn = useSelector(
        (state: RootState) => state.authentication.loggedIn
    );
    const token = useSelector((state: RootState) => state.authentication.token);
    const userId = useSelector(
        (state: RootState) => state.authentication.user?.id
    );
    const dispatch = useDispatch();
    const hasFetched = useRef<boolean>(false);

    useEffect(() => {
        console.log('[PrepareImplementation] Activation main useEffect');

        if (hasFetched.current === false && typeof token === 'string') {
            const fetchData = async (): Promise<void> => {
                await fillChannelStore({ dispatch, token });
                await fillConversationStore({ dispatch, token, userId });
            };

            fetchData();

            hasFetched.current = true;

            return () => {};
        }

        return () => {};
    });

    return (
        <>
            <section className="body-dashboard">
                <div className="main-dashboard">
                    <div>
                        {hasFetched.current === true ? (
                            <>
                                <h2>#######################################</h2>

                                <h2>
                                    Vous êtes connecté :{' '}
                                    {isLoggedIn ? 'Oui' : 'Non'}
                                </h2>
                                <h2>#######################################</h2>

                                <h2>Number of Channels : {channels?.length}</h2>
                                <h2>
                                    Number of Messages in channel 1 :{' '}
                                    {channelMessages?.length}
                                </h2>
                                <h2>#######################################</h2>

                                <h2>
                                    Number of Conversations :{' '}
                                    {conversations?.length}
                                </h2>
                                <h2>
                                    Number of Messages in conversation 1 :{' '}
                                    {conversationMessages?.length}
                                </h2>
                                <h2>#######################################</h2>

                                <Logout />
                            </>
                        ) : (
                            <>
                                <h2>#######################################</h2>

                                <h2>Vous êtes connecté : {isLoggedIn}</h2>
                                <h2>#######################################</h2>
                                <h2>Awaiting for data to be fetched... x </h2>
                                <Logout />
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
