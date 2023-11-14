import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';

export default function Dashboard(): JSX.Element {
    const token = useSelector((state: RootState) => state.authentication.token);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Dashboard</h1>

            <>
                <p className="text-black">Vous êtes connecté</p>
                <p className="text-black">Token: {token}</p>
            </>

            <button className="btn btn-primary mt-2">
                <Link to="/" className="text-white">
                    Login
                </Link>
            </button>

            <button
                className="btn btn-primary mt-2"
                onClick={() => dispatch({ type: 'authentication/logout' })}
            >
                Logout
            </button>
        </div>
    );
}
