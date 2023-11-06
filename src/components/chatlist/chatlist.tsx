import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ChatListItems from './chatlistitem';
import './chatlist.css';

interface ChatUser {
    id: number;
    name: string;
    active: boolean;
    isOnline: boolean;
}

/* interface ChatListState {
    allChats: ChatUser[];
} */

const ChatList: React.FC = () => {
    const allChatUsers: ChatUser[] = [
        {
            id: 1,
            name: 'Tom bonnet',
            active: true,
            isOnline: true,
        },
        {
            id: 2,
            name: 'Tom bonnet',
            active: false,
            isOnline: false,
        },
        {
            id: 3,
            name: 'Tom bonnet',
            active: false,
            isOnline: false,
        },
        {
            id: 4,
            name: 'Tom bonnet',
            active: false,
            isOnline: true,
        },
        {
            id: 5,
            name: 'Tom bonnet',
            active: false,
            isOnline: false,
        },
        {
            id: 6,
            name: 'Tom bonnet',
            active: false,
            isOnline: true,
        },
        {
            id: 7,
            name: 'Tom bonnet',

            active: false,
            isOnline: true,
        },
        {
            id: 8,
            name: 'Tom bonnet',
            active: false,
            isOnline: false,
        },
        {
            id: 9,
            name: 'Tom bonnet',
            active: false,
            isOnline: true,
        },
        {
            id: 10,
            name: 'Tom bonnet',
            active: false,
            isOnline: true,
        },
    ];

    const [state, setState] = useState({
        allChats: allChatUsers,
    });

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
                {state.allChats.map((item, index) => (
                    <ChatListItems
                        name={item.name}
                        key={item.id}
                        animationDelay={index + 1}
                        image={'https://i.pravatar.cc/?img=' + item.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatList;
