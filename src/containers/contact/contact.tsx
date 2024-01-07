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
    const userId = useSelector(
        (state: RootState) => state.authentication.user?.id
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [contactSuggestions, setContactSuggestions] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const suggestionUpdatedRef = useRef<boolean>(false);

    const fetchContactSuggestions = useCallback(async (): Promise<void> => {
        const response = await fetch(
            `http://localhost:8000/users/${userId}/contacts/random`,
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
    }, [dispatch, token, userId]);

    const fetchContactsList = useCallback(async (): Promise<void> => {
        const response = await fetch(
            `http://localhost:8000/users/${userId}/contacts`,
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
                topics: [
                    ...(json.data.contacts || []).map(
                        (contact: IUser) => `/contacts/${contact.id}`
                    ),
                ],
            },
        });
    }, [dispatch, token, userId]);

    useEffect(() => {
        console.log('[Contact] UseEffect');

        if (!suggestionUpdatedRef.current) {
            const fetchAndSetContacts = async (): Promise<void> => {
                await fetchContactsList();

                await fetchContactSuggestions();

                setIsLoading(false);
            };

            fetchAndSetContacts();

            suggestionUpdatedRef.current = true;
        }
    }, [fetchContactSuggestions, fetchContactsList]);

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
