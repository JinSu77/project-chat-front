import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const handleLogout = (
    dispatch: React.Dispatch<AnyAction>,
    navigate: ReturnType<typeof useNavigate> | null = null,
    navigateToLogin: boolean = true
): void => {
    dispatch({ type: 'authentication/resetToDefault' });
    dispatch({ type: 'channels/resetToDefault' });
    dispatch({ type: 'conversations/resetToDefault' });
    dispatch({ type: 'chatComponent/resetToDefault' });

    if (navigateToLogin && navigate) {
        return navigate('/login');
    }
};

export default function Logout(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <button
            className="btn btn-primary"
            onClick={() => handleLogout(dispatch, navigate)}
        >
            Logout
        </button>
    );
}
