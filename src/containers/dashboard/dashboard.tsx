import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Dashboard(): JSX.Element {
    const authentication = useSelector(
        (state: RootState) => state.authentication
    );
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Dashboard</h1>

            <>
                <p className="text-black">Vous êtes connecté</p>
                <p className="text-black">
                    Username: {authentication.user?.username}
                </p>
                <p className="text-black">
                    Email: {authentication.user?.email}
                </p>
                <p className="text-black">
                    Token à utiliser pour les requêtes: {authentication.token}
                </p>
            </>

            <button
                className="btn btn-primary mt-2"
                onClick={() => dispatch({ type: 'authentication/logout' })}
            >
                Logout
            </button>
        </div>
    );
}
