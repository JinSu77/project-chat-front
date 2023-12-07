import { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import useApiFetch, { FetchProps } from '../hooks/useApiFetch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IMessage } from '../interfaces/message/IMessage';

const CreateMessage = (): JSX.Element => {
    const [fetchData, { data, error, isLoading }] = useApiFetch();
    const [content, setContent] = useState<string>('');
    const dispatch = useDispatch();
    const activeConversationId: number = useSelector(
        (state: RootState) => state.chatComponent.activeConversationId
    );
    const conversationType: string | null = useSelector(
        (state: RootState) => state.chatComponent.type
    );
    const token = useSelector((state: RootState) => state.authentication.token);

    useEffect(() => {
        console.log('[CreateMessage] useEffect');

        if (data && data.message) {
            setContent('');

            const newMessage: IMessage = data.message as IMessage;

            dispatch({
                type: 'chatComponent/addMessage',
                payload: {
                    message: newMessage,
                },
            });
        }
    }, [data, dispatch]);

    const sendMessage = async (): Promise<void> => {
        if (content === '' || content.trim() === '') {
            return;
        }

        let url: string = '';

        if (conversationType === 'channels') {
            url = `http://localhost:8000/channels/${activeConversationId}/messages`;
        }

        if (conversationType === 'conversations') {
            url = `http://localhost:8000/conversations/${activeConversationId}/messages`;
        }

        if (url === '') {
            return;
        }

        const message = {
            content: content,
        };

        const fetchProps: FetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            url: url,
            body: message,
        };

        await fetchData(fetchProps);
    };

    return (
        <>
            <div className="sendNewMessage">
                {/* <button className="addFiles">
                    <i className="fa fa-plus"></i>
                </button> */}
                <input
                    type="text"
                    placeholder="Ecrire ici"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setContent(e.target.value)
                    }
                    value={content}
                    onKeyDown={async (
                        e: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                        if (e.key === 'Enter') {
                            await sendMessage();
                        }
                    }}
                />
                <button
                    className="btnSendMsg"
                    id="sendMsgBtn"
                    onClick={async () => await sendMessage()}
                >
                    {isLoading ? (
                        <span className="loading">Loading...</span>
                    ) : (
                        <FaPaperPlane />
                    )}
                </button>
            </div>

            {error && (
                <div className="px-3 bg-red-500 rounded text-white">
                    {error}
                </div>
            )}
        </>
    );
};

export default CreateMessage;
