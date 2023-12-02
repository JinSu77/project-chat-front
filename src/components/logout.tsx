import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Logout(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        dispatch({ type: 'authentication/resetToDefault' });
        dispatch({ type: 'channels/resetToDefault' });
        dispatch({ type: 'conversations/resetToDefault' });

        return navigate('/');
    };

    return (
        <button className="btn btn-primary" onClick={handleLogout}>
            Logout
        </button>
    );
}
