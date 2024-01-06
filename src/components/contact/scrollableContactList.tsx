import { IUser } from '../../interfaces/user/IUser';
import avatar_default from '../../assets/avatar_default.jpg';
import Avatar from '../chatlist/avatar';
import DeleteButton from '../button/deleteButton';
import AddButton from '../button/addButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ScrollableContactListProps {
    contacts: IUser[];
    title: string;
    navigateTo?: (id: number) => void;
    deleteMode?: boolean;
    updateMode?: boolean;
}

const ScrollableContactList = ({
    contacts,
    title,
    navigateTo,
    updateMode,
    deleteMode,
}: ScrollableContactListProps): JSX.Element => {
    const conversations = useSelector(
        (state: RootState) => state.conversations.data
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
                            className="flex flex-row hover:bg-gray-100 border-b items-center p-2"
                            key={contact.id}
                        >
                            {deleteMode &&
                                DeleteButton({
                                    onClick: () => {
                                        alert('delete contact');
                                    },
                                })}

                            {updateMode &&
                                AddButton({
                                    onClick: () => {
                                        alert('add contact');
                                    },
                                })}

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
                                    <p>{contact.username}</p>
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
