import React, { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import ChatListItems from './chatlistitem';
import './chatlist.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ChatList: React.FC = () => {
    const conversation = useSelector((state: RootState) => state.chatList.data);
    const type = useSelector((state: RootState) => state.chatList.type);

    useEffect(() => {
        console.log('[ChatList] Activation main useEffect');

        console.log('Conversation', conversation.length);
        console.log('Type', type);
    }, [conversation, type]);

    return (
        <div className="main__chatlist">
            <button className="btn">
                <span>+ New conversation</span>
            </button>

            <div className="chatlist__heading">
                <h2>Chats</h2>
                <button className="btn-nobg">
                    <i className="fa fa-ellipsis-h"></i>
                </button>
            </div>
            <div className="chatList__search">
                <div className="search_wrap">
                    <input type="text" placeholder="Search Here" required />
                    <button className="search-btn">{<FaSearch />}</button>
                </div>
            </div>
            <div className="chatlist__items">
                {conversation.map((item, index) => (
                    <ChatListItems
                        animationDelay={index + 1}
                        image={'https://i.pravatar.cc/?img=' + index}
                        item={item}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatList;
