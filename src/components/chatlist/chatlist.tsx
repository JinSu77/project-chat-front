import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './chatlist.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IConversation } from '../../interfaces/conversation/IConversation';
import { IChannel } from '../../interfaces/channel/IChannel';
import MapChatListItem from './mapChatListItem';

const ChatList: React.FC = () => {
    const chatComponentType: string | null = useSelector(
        (state: RootState) => state.chatComponent.type
    );
    const conversations: IConversation[] = useSelector(
        (state: RootState) => state.conversations.data
    );
    const channels: IChannel[] = useSelector(
        (state: RootState) => state.channels.data
    );
    const [data, setData] = useState<IConversation[] | IChannel[]>([]);

    useEffect(() => {
        console.log('[ChatList] UseEffect');

        if (chatComponentType === 'channels') {
            setData(channels);
        }

        if (chatComponentType === 'conversations') {
            setData(conversations);
        }
    }, [chatComponentType, conversations, channels]);

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
                <MapChatListItem data={data} />
            </div>
        </div>
    );
};

export default ChatList;
