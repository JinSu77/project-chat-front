import { IUser } from '../../interfaces/user/IUser';
import avatar_default from '../../assets/avatar_default.jpg';
import Avatar from '../chatlist/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AsyncDeleteButton from '../button/asyncDeleteButton';
import AsyncCreateButton from '../button/asyncCreateButton';

interface ScrollableContactListProps {
    contacts: IUser[];
    title: string;
    navigateTo?: (id: number) => void;
    deleteMode?: boolean;
    isClickable?: boolean;
    createMode?: boolean;
}

const ScrollableContactList = ({
    contacts,
    title,
    navigateTo,
    createMode,
    isClickable,
    deleteMode,
}: ScrollableContactListProps): JSX.Element => {
    const conversations = useSelector(
        (state: RootState) => state.conversations.data
    );
    const token = useSelector((state: RootState) => state.authentication.token);
    const userId = useSelector(
        (state: RootState) => state.authentication.user?.id
    );

    const getContactConversationId = (contactId: number): number => {
        const conversation = conversations.find((c) => {
            return c.participants.find((p) => {
                return p.id === contactId;
            });
        });

        if (conversation?.id) {
            return conversation.id;
        }

        return 0;
    };

    return (
        <div className="w-[400px]">
            <div className="h-[600px] bg-white rounded-lg shadow-lg overflow-y-auto m-5 py-2">
                <h1 className="underline">{title}</h1>

                <div className="p-2 flex flex-col gap-2">
                    {contacts.map((contact) => (
                        <div
                            className={
                                'flex flex-row hover:bg-gray-100 border-b items-center p-2' +
                                (isClickable ? ' cursor-pointer' : '')
                            }
                            key={contact.id}
                        >
                            {deleteMode && (
                                <AsyncDeleteButton
                                    url={`http://localhost:8000/users/${userId}/contacts/${contact.id}`}
                                    reduxStoreAction={{
                                        type: 'contacts/removeContact',
                                        payload: {
                                            id: contact.id,
                                        },
                                    }}
                                    token={token ?? ''}
                                />
                            )}

                            {createMode && (
                                <AsyncCreateButton
                                    onClick={() => {
                                        alert('add contact');
                                    }}
                                />
                            )}

                            <div
                                key={contact.id}
                                className="flex flex-row gap-2 items-center w-full"
                                onClick={() => {
                                    if (navigateTo) {
                                        navigateTo(
                                            getContactConversationId(contact.id)
                                        );
                                    }
                                }}
                            >
                                <Avatar image={avatar_default} />

                                <div className="userMeta">
                                    <p className="text-black">
                                        {contact.username}
                                    </p>
                                    <span>
                                        {contact.firstName +
                                            ' ' +
                                            contact.lastName}{' '}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollableContactList;
