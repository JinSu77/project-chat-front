import './conversation.css';
import Nav from '../../components/nav/nav';
import ChatBody from '../../components/chatbody/chatbody';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Conversation(): JSX.Element {
    const chatComponentLoading = useSelector(
        (state: RootState) => state.chatComponent.isLoading
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log('[Conversation] UseEffect');

        if (isLoading !== chatComponentLoading) {
            setIsLoading(chatComponentLoading);
        }
    }, [chatComponentLoading, isLoading]);

    return (
        <div className="body-conversation">
            <div className="main-conv">
                <Nav />
                {isLoading === true ? (
                    <div className="w-full h-auto flex justify-center items-center">
                        <div className="loading"></div>
                    </div>
                ) : (
                    <ChatBody />
                )}
            </div>
        </div>
    );
}
