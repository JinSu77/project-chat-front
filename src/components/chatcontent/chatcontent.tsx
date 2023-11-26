import React, { useState, createRef, useEffect } from 'react';
import './chatcontent.css';
import Avatar from '../chatlist/avatar';
import ChatItem from './chatitem';
//import { FaPaperPlane } from 'react-icons/fa';

interface ChatContentProps {}

interface ChatItemData {
    key: number;
    image: string;
    type: string;
    msg: string;
}

const ChatContent: React.FC<ChatContentProps> = () => {
    const messagesEndRef = createRef<HTMLDivElement>();

    const [chatItems, setChatItems] = useState<ChatItemData[]>([]);

    const [msg, setMsg] = useState<string>('');

    const scrollToBottom = (): void => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
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
        });
        scrollToBottom();
    }, [chatItems, msg, scrollToBottom]);

    const onStateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setMsg(e.target.value);
    };

    return (
        <div className="main__chatcontent">
            <div className="content__header">
                <div className="blocks">
                    <div className="current-chatting-user">
                        <Avatar image="../../assets/login/profilphoto.jpg" />
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
                    {chatItems.map((itm, index) => (
                        <ChatItem
                            animationDelay={index + 2}
                            key={itm.key}
                            user={itm.type ? itm.type : 'me'}
                            msg={itm.msg}
                            image={itm.image}
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
                        {/* <FaPaperPlane /> */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatContent;
