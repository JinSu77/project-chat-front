import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import '../../data/auth';
import jauneBleuBlur from '../../assets/login/jaune-bleu-blur.png';
import monsieurLogin from '../../assets/login/monsieur-login.png';
import { useDispatch, useSelector } from 'react-redux';
import useApiFetch, { FetchProps } from '../../hooks/useApiFetch';
import IUserLoginForm from '../../interfaces/auth/IUserLoginForm';
import TextInput from '../../components/TextInput/TextInput';
import { RootState } from '../../store/store';

function Login(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fetchData, { data, error, isLoading }] = useApiFetch();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const isLoggedIn = useSelector(
        (state: RootState) => state.authentication.loggedIn
    );

    useEffect(() => {
        console.log('[Login] UseEffect');
        if (isLoggedIn) {
            navigate('/channels', { replace: true });

            return;
        }

        if (data && data.token) {
            dispatch({
                type: 'authentication/login',
                payload: {
                    loggedIn: true,
                    token: data.token,
                    user: data.user,
                },
            });

            dispatch({
                type: 'mercure/setToken',
                payload: {
                    token: data.mercureToken,
                },
            });

            return;
        }
    }, [data, dispatch, isLoggedIn, navigate]);

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        const user: IUserLoginForm = {
            username: username,
            password: password,
        };

        const fetchProps: FetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            url: 'http://localhost:8000/auth/login',
            body: user,
        };

        await fetchData(fetchProps);
    };

    return (
        <div className="login-body">
            <div className="flex justify-center h-screen p-10">
                <section className="bg-white w-full pt-10 pb-10 pl-3 pr-3 flex  rounded-3xl">
                    <div className="form-control w-full max-w-xs">
                        <h1 className="text-5xl">Connectez-vous</h1>

                        {/* Login */}
                        {error && (
                            <p className="text-black bg-red-200 text-center">
                                {error}
                            </p>
                        )}

                        {isLoading === false && (
                            <p className="text-black bg-green-200 text-center">
                                loading : {isLoading.toString()}
                            </p>
                        )}

                        {isLoading === true && (
                            <p className="text-black bg-red-200 text-center">
                                loading : {isLoading.toString()}
                            </p>
                        )}

                        <form
                            onSubmit={handleFormSubmit}
                            className="registerForm"
                        >
                            <TextInput
                                label="Identifiant"
                                type="text"
                                placeholder="Entrez un username"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                minLength={4}
                                required
                            />

                            <TextInput
                                label="Mot de passe"
                                type="password"
                                placeholder="Entrez un mot de passe"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                minLength={4}
                                required
                            />

                            <button className="btn btn-primary mt-2">
                                Login
                            </button>
                        </form>
                        {/* Login */}

                        <p>
                            Pas de compte ? Clique{' '}
                            <Link to="/register" className="text-sky-700 ">
                                ici
                            </Link>
                        </p>
                        <img src={jauneBleuBlur} alt="Image 1" />
                        <img src={monsieurLogin} alt="Image 2" />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Login;
