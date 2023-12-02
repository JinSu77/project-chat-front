import './conversation.css';
import Nav from '../../components/nav/nav';
import ChatBody from '../../components/chatbody/chatbody';

export default function Conversation(): JSX.Element {
    return (
        <div className="body-conversation">
            <div className="main-conv">
                <Nav />
                <ChatBody />
            </div>
        </div>
    );
}
