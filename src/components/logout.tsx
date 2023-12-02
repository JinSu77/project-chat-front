import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Logout(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        dispatch({ type: 'authentication/resetToDefault' });
        dispatch({ type: 'channels/resetToDefault' });
        dispatch({ type: 'conversations/resetToDefault' });
        dispatch({ type: 'chatList/resetToDefault' });

        return navigate('/login');
    };

    return (
        <button className="btn btn-primary" onClick={handleLogout}>
            Logout
        </button>
    );
}
