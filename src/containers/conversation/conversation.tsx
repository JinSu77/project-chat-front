import './conversation.css';
import Nav from '../../components/nav/nav';
import ChatBody from '../../components/chatbody/chatbody';

export default function Conversation(): JSX.Element {
    /* 
        lA NavBar nous permet de modifier l'etat de ces stores pour changer 
            les components chatList et chatContent
            
        On vas créer deux stores qui gère 
            -> les conversations qui s'affiche dans chatList
            -> les messages qui s'affiche dans chatContent
    */

    return (
        <div className="body-conversation">
            <div className="main-conv">
                <Nav />

                <ChatBody />
            </div>
        </div>
    );
}
