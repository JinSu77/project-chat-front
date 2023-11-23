/* import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'; */
import './conversation.css';
import Nav from '../../components/nav/nav';
import ChatBody from '../../components/chatbody/chatbody';

export default function Conversation(): JSX.Element {
    /*    const token = useSelector((state: RootState) => state.authentication.token);
    const dispatch = useDispatch(); */

    return (
        <div className="body-conversation">
            <div className="main-conv">
                <Nav />
                <ChatBody />
            </div>
        </div>
    );
}
