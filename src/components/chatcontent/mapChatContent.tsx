import ChatItem from './chatitem';
import avatar_default from '../../assets/avatar_default.jpg';
import { IMessage } from '../../interfaces/message/IMessage';
import { createRef, useCallback, useEffect } from 'react';

const MapChatContent = ({
    messages,
}: {
    messages: IMessage[];
}): JSX.Element => {
    const messagesEndRef = createRef<HTMLDivElement>();
    const scrollToBottom = useCallback(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messagesEndRef]);

    useEffect(() => {
        console.log('[MapChatContent] UseEffect');
        scrollToBottom();
    }, [scrollToBottom]);

    return (
        <>
            <div className="content__body">
                <div className="chat__items">
                    {messages.map((message, index) => (
                        <ChatItem
                            animationDelay={index + 2}
                            key={index}
                            image={avatar_default}
                            message={message}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </>
    );
};

export default MapChatContent;
