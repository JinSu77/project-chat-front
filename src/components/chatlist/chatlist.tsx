import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './chatlist.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IConversation } from '../../interfaces/conversation/IConversation';
import { IChannel } from '../../interfaces/channel/IChannel';
import MapChatListItem from './mapChatListItem';
import renderWhenLoaded from '../../utils/renderWhenLoaded';
import { ChatComponentType } from '../../state/component/chatComponent';

interface ChatListProps {
    channels: IChannel[];
    conversations: IConversation[];
    type: ChatComponentType;
}

const ChatList: React.FC<ChatListProps> = (props: ChatListProps) => {
    const chatComponentLoading = useSelector(
        (state: RootState) => state.chatComponent.isLoading
    );
    const [data, setData] = useState<IConversation[] | IChannel[]>([]);

    useEffect(() => {
        console.log('[ChatList] UseEffect');

        const setDataState = (): void => {
            if (props.type === 'channels') {
                setData(props.channels);
            }

            if (props.type === 'conversations') {
                setData(props.conversations);
            }
        };

        setDataState();
    }, [props.channels, props.conversations, props.type]);

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
                {renderWhenLoaded({
                    isLoading: chatComponentLoading,
                    loadedComponent: (
                        <>
                            <MapChatListItem data={data} />
                        </>
                    ),
                })}
            </div>
        </div>
    );
};

export default ChatList;
