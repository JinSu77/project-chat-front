import React from 'react';
import './chatcontent.css';
import Avatar from '../chatlist/avatar';
import avatar_default from '../../assets/avatar_default.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IMessage } from '../../interfaces/message/IMessage';
import MapChatContent from './mapChatContent';
import CreateMessage from '../createMessage';
import renderWhenLoaded from '../../utils/renderWhenLoaded';

const ChatContent: React.FC = () => {
    const chatComponentLoading = useSelector(
        (state: RootState) => state.chatComponent.isLoading
    );
    const messages: IMessage[] = useSelector(
        (state: RootState) => state.chatComponent.messages
    );
    const conversationName: string = useSelector(
        (state: RootState) => state.chatComponent.activeConversationName
    );
    const activeConversationId: number = useSelector(
        (state: RootState) => state.chatComponent.activeConversationId
    );

    return (
        <div className="main__chatcontent">
            <div className="content__header">
                <div className="blocks">
                    <div className="current-chatting-user">
                        {conversationName !== '' && (
                            <>
                                <Avatar image={avatar_default} />
                                <p>{conversationName}</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="blocks">
                    <div className="settings">
                        <button className="btn-nobg"></button>
                    </div>
                </div>
            </div>

            {renderWhenLoaded({
                isLoading: chatComponentLoading,
                loadedComponent: (
                    <>
                        <MapChatContent messages={messages} />

                        <div className="content__footer">
                            {activeConversationId !== 0 && <CreateMessage />}
                        </div>
                    </>
                ),
            })}
        </div>
    );
};

export default ChatContent;
