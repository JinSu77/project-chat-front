import { Link } from 'react-router-dom';
import logo from '../../assets/login/logo-chat.png';
import './nav.css';
import Logout from '../logout';

export default function Nav(): JSX.Element {
    return (
        <>
            <ul className="nav">
                <li>
                    <img src={logo} alt="logo" />
                </li>

                <li>
                    <Link to="/test">Channel</Link>
                </li>

                <li>
                    <Link to="/test">Conversation</Link>
                </li>

                <li>
                    <Logout />
                </li>
            </ul>
        </>
    );
}
