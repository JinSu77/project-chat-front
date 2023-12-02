import logo from '../../assets/login/logo-chat.png';
import './nav.css';

export default function Nav(): JSX.Element {
    return (
        <div className="nav">
            <div className="nav_blocks">
                <img src={logo} />
            </div>
            <div className="nav_blocks"></div>
            <div className="nav_blocks"></div>
        </div>
    );
}
