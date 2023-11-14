import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import '../../data/auth';
import jauneBleuBlur from '../../assets/login/jaune-bleu-blur.png';
import monsieurLogin from '../../assets/login/monsieur-login.png';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import useApiFetch, { FetchProps } from '../../hooks/useApiFetch';

function Login(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fetchData, { data, error, isLoading }] = useApiFetch();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        console.log('[Login] Activation useEffect');

        if (data && data.token) {
            dispatch({ type: 'authentication/login', payload: data.token });

            navigate('/dashboard');
        }

        return () => {};
    }, [data, dispatch, navigate]);

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        const fetchProps: FetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            url: 'http://localhost:8000/auth/login',
            body: {
                username,
                password,
            },
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
                            {/* 
                Utiliser le composant INPUT
              */}

                            <label className="label">
                                <span className="label-text">Identifiant</span>
                            </label>

                            <input
                                type="text"
                                placeholder="Entrez un username"
                                className="input input-bordered w-full max-w-xs rounded-xl"
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                minLength={4}
                                required
                            />

                            <label className="label">
                                <span className="label-text">Mot de passe</span>
                            </label>

                            <input
                                type="password"
                                placeholder="Entrez un mot de passe"
                                className="input input-bordered w-full max-w-xs bg- rounded-xl"
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
