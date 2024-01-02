import logo from '../../assets/login/logo-chat.png';
import './nav.css';
import Logout from '../logout';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useRef } from 'react';

export default function Nav(): JSX.Element {
    const chatComponentType = useSelector(
        (state: RootState) => state.chatComponent.type
    );
    const channels = useSelector((state: RootState) => state.channels.data);
    const conversations = useSelector(
        (state: RootState) => state.conversations.data
    );

    const channelIdRef = useRef<number>(0);
    const conversationIdRef = useRef<number>(0);

    const getConversationUrl = (): string => {
        const firstConversationId = conversations[0]?.id;

        if (
            !isNaN(firstConversationId) &&
            firstConversationId !== conversationIdRef.current
        ) {
            conversationIdRef.current = firstConversationId;
        }

        if (conversationIdRef.current === 0) {
            return '/conversations';
        }

        return `/conversations/${conversationIdRef.current}`;
    };

    const getChannelUrl = (): string => {
        const firstChannelId = channels[0]?.id;

        if (!isNaN(firstChannelId) && firstChannelId !== channelIdRef.current) {
            channelIdRef.current = firstChannelId;
        }

        if (channelIdRef.current === 0) {
            return '/channels';
        }

        return `/channels/${channelIdRef.current}`;
    };

    const preventUnnecessaryAction = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
        e.preventDefault();
    };

    return (
        <>
            <ul className="nav">
                <li>
                    <img src={logo} alt="logo" />
                </li>

                <li>
                    <Link
                        onClick={
                            chatComponentType === 'channels'
                                ? preventUnnecessaryAction
                                : () => {}
                        }
                        to={getChannelUrl()}
                    >
                        Channel
                    </Link>
                </li>

                <li>
                    <Link
                        onClick={
                            chatComponentType === 'conversations'
                                ? preventUnnecessaryAction
                                : () => {}
                        }
                        to={getConversationUrl()}
                    >
                        Conversation
                    </Link>
                </li>

                <li>
                    <Logout />
                </li>
            </ul>
        </>
    );
}
