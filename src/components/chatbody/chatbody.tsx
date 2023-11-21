import ChatContent from '../chatcontent/chatcontent';
import ChatList from '../chatlist/chatlist';
/* import UserProfile from '../userprofile/userprofile'; */
import './chatbody.css';
export default function ChatBody(): JSX.Element {
    return (
        <div className="main_chatbody">
            <ChatList />
            <ChatContent />
            {/* <UserProfile /> */}
        </div>
    );
}
