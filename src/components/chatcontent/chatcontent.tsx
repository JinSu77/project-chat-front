import React, { useState, createRef, useEffect } from 'react';
import './chatcontent.css';
import Avatar from '../chatlist/avatar';
import ChatItem from './chatitem';
import { FaPaperPlane } from 'react-icons/fa';
import avatar_default from '../../assets/avatar_default.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IMessage } from '../../interfaces/message/IMessage';

const ChatContent: React.FC = () => {
    const messagesEndRef = createRef<HTMLDivElement>();
    const [msg, setMsg] = useState<string>('');
    const messages: IMessage[] = useSelector(
        (state: RootState) => state.chatComponent.messages
    );
    const scrollToBottom = (): void => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        console.log('[ChatContent] UseEffect');
        /*         window.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                if (msg !== '') {
                    const newChatItem: ChatItemData = {
                        key: chatItems.length + 1,
                        type: '',
                        msg: msg,
                        image: '',
                    };
                    setChatItems([...chatItems, newChatItem]);
                    setMsg('');
                }
            }
        }); */
        scrollToBottom();
    }, [msg, scrollToBottom]);

    const onStateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setMsg(e.target.value);
    };

    return (
        <div className="main__chatcontent">
            <div className="content__header">
                <div className="blocks">
                    <div className="current-chatting-user">
                        <Avatar image={avatar_default} />
                        <p>Tom Bonnet</p>
                    </div>
                </div>

                <div className="blocks">
                    <div className="settings">
                        <button className="btn-nobg"></button>
                    </div>
                </div>
            </div>
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
            <div className="content__footer">
                <div className="sendNewMessage">
                    <button className="addFiles">
                        <i className="fa fa-plus"></i>
                    </button>
                    <input
                        type="text"
                        placeholder="Ecrire ici"
                        onChange={onStateChange}
                        value={msg}
                    />
                    <button className="btnSendMsg" id="sendMsgBtn">
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatContent;
