import logo from '../../assets/login/logo-chat.png';
import './nav.css';
import Logout from '../logout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect } from 'react';

export default function Nav(): JSX.Element {
    const dispatch = useDispatch();
    const chatComponentType = useSelector(
        (state: RootState) => state.chatComponent.type
    );

    useEffect(() => {
        console.log('[Nav] UseEffect');

        if (chatComponentType === null) {
            dispatch({
                type: 'chatComponent/setChatComponent',
                payload: {
                    type: 'channels',
                },
            });
        }
    }, [chatComponentType, dispatch]);

    const setChatComponentStore = (
        e: React.MouseEvent<HTMLButtonElement>
    ): void => {
        e.preventDefault();

        dispatch({
            type: 'chatComponent/setChatComponent',
            payload: {
                type: e.currentTarget.value,
            },
        });

        dispatch({
            type: 'chatComponent/setActiveConversation',
            payload: {
                activeConversation: null,
                messages: [],
            },
        });
    };

    return (
        <>
            <ul className="nav">
                <li>
                    <img src={logo} alt="logo" />
                </li>

                <li>
                    <button onClick={setChatComponentStore} value={'channels'}>
                        Channel
                    </button>
                </li>

                <li>
                    <button
                        onClick={setChatComponentStore}
                        value={'conversations'}
                    >
                        Conversation
                    </button>
                </li>

                <li>
                    <Logout />
                </li>
            </ul>
        </>
    );
}
