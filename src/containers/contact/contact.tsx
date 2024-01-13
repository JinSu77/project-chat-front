import { useDispatch, useSelector } from 'react-redux';
import Nav from '../../components/nav/nav';
import { RootState } from '../../store/store';
import ScrollableContactList from '../../components/contact/scrollableContactList';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IUser } from '../../interfaces/user/IUser';
import { handleLogout } from '../../components/logout';
import renderWhenLoaded from '../../utils/renderWhenLoaded';

export default function Contact(): JSX.Element {
    const contacts = useSelector((state: RootState) => state.contacts.data);
    const token = useSelector((state: RootState) => state.authentication.token);
    const user = useSelector((state: RootState) => state.authentication.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [contactSuggestions, setContactSuggestions] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const contactsLength = useRef<number>(0);
    const suggestionUpdatedRef = useRef<boolean>(false);

    const fetchContactSuggestions = useCallback(async (): Promise<void> => {
        const response = await fetch(
            `http://localhost:8000/users/${user?.id}/contacts/random`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            handleLogout(dispatch, null, false);
            return;
        }

        const json = await response.json();

        setContactSuggestions(json.data.contacts);
    }, [dispatch, token, user?.id]);

    const fetchContactsList = useCallback(async (): Promise<void> => {
        const response = await fetch(
            `http://localhost:8000/users/${user?.id}/contacts`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            handleLogout(dispatch, null, false);
            return;
        }

        const json = await response.json();

        dispatch({
            type: 'contacts/setContacts',
            payload: json.data,
        });

        dispatch({
            type: 'mercure/setTopics',
            payload: {
                topics: [`/users/${user?.username}${user?.id}/contacts`],
            },
        });

        contactsLength.current = json.data.contacts.length;
    }, [dispatch, token, user]);

    useEffect(() => {
        console.log('[Contact] UseEffect');

        if (!suggestionUpdatedRef.current) {
            const fetchAndSetContacts = async (): Promise<void> => {
                await Promise.all([
                    fetchContactsList(),
                    fetchContactSuggestions(),
                ]);

                setIsLoading(false);
            };

            fetchAndSetContacts();

            suggestionUpdatedRef.current = true;

            return;
        }

        console.log('[Contact] UseEffect else');

        if (contacts) {
            if (contacts.length !== contactsLength.current) {
                console.log('[Contact] updating contact suggestion');

                const updateContactSuggestion = async (): Promise<void> => {
                    await fetchContactSuggestions();

                    contactsLength.current = contacts.length;
                };

                updateContactSuggestion();
            }
        }
    }, [contacts, fetchContactSuggestions, fetchContactsList]);

    return (
        <div className="body-conversation">
            <div className="main-conv">
                <Nav />

                <div className="main_chatbody">
                    {renderWhenLoaded({
                        isLoading: isLoading,
                        loadedComponent: (
                            <>
                                <ScrollableContactList
                                    contacts={contacts}
                                    navigateTo={(id: number) => {
                                        navigate(`/conversations/${id}`);
                                    }}
                                    title="Mes contacts :"
                                    deleteMode={true}
                                    isClickable={true}
                                />

                                <ScrollableContactList
                                    contacts={contactSuggestions}
                                    title="Suggestions de contacts :"
                                    createMode={true}
                                />
                            </>
                        ),
                    })}
                </div>
            </div>
        </div>
    );
}
