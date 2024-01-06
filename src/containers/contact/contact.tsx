import { useSelector } from 'react-redux';
import Nav from '../../components/nav/nav';
import { RootState } from '../../store/store';
import ScrollableContactList from '../../components/contact/scrollableContactList';
import { useNavigate } from 'react-router-dom';

export default function Contact(): JSX.Element {
    const contacts = useSelector((state: RootState) => state.contacts.data);
    const navigate = useNavigate();

    return (
        <div className="body-conversation">
            <div className="main-conv">
                <Nav />

                <div className="main_chatbody">
                    <ScrollableContactList
                        contacts={contacts}
                        navigateTo={(id: number) => {
                            navigate(`/conversations/${id}`);
                        }}
                        title="Mes contacts :"
                        deleteMode={true}
                    />

                    <ScrollableContactList
                        contacts={contacts}
                        title="Suggestions de contacts :"
                        updateMode={true}
                    />
                </div>
            </div>
        </div>
    );
}
