import logo from '../../assets/login/logo-chat.png';
import './nav.css';
import Logout from '../logout';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Nav(): JSX.Element {
    const chatComponentType = useSelector(
        (state: RootState) => state.chatComponent.type
    );

    const preventUnnecessaryAction = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
        e.preventDefault();
    };

    return (
        <>
            <ul className="nav">
                <li>
                    <img src={logo} alt="logo" />
                </li>

                <li>
                    <Link
                        onClick={
                            chatComponentType === 'channels'
                                ? preventUnnecessaryAction
                                : () => {}
                        }
                        to="/channels/1"
                    >
                        Channel
                    </Link>
                </li>

                <li>
                    <Link
                        onClick={
                            chatComponentType === 'conversations'
                                ? preventUnnecessaryAction
                                : () => {}
                        }
                        to="/conversations"
                    >
                        Conversation
                    </Link>
                </li>

                <li>
                    <Logout />
                </li>
            </ul>
        </>
    );
}
