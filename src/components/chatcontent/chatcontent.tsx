import React, { useState } from 'react';
import './chatcontent.css';
import Avatar from '../chatlist/avatar';
import { FaPaperPlane } from 'react-icons/fa';
import avatar_default from '../../assets/avatar_default.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IMessage } from '../../interfaces/message/IMessage';
import MapChatContent from './mapChatContent';

const ChatContent: React.FC = () => {
    const messages: IMessage[] = useSelector(
        (state: RootState) => state.chatComponent.messages
    );
    const [msg, setMsg] = useState<string>('');
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

            <MapChatContent messages={messages} msg={msg} />

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
