import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import '../../data/auth';
import jauneBleuBlur from '../../assets/login/jaune-bleu-blur.png';
import monsieurLogin from '../../assets/login/monsieur-login.png';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../store/store';

function Login(): JSX.Element {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.authentication.token);
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        console.log('[Login] Activation useEffect');

        if (token) {
            navigate('/dashboard', { replace: true });
        }

        return () => {};
    }, [token, navigate]);

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return response.json().then((err) => {
                    if (err.data.error) {
                        throw new Error(err.data.error);
                    }

                    if (err.data.errors) {
                        throw new Error(err.data.errors);
                    }
                });
            })
            .then((data) => {
                dispatch({
                    type: 'authentication/login',
                    payload: data.data.token,
                });
            })
            .catch((error) => {
                console.log(error);

                if (error.message) {
                    setErrorMessage(error.message);
                }
            });
    }

    return (
        <div className="login-body">
            <div className="flex justify-center h-screen p-10">
                <section className="bg-white w-full pt-10 pb-10 pl-3 pr-3 flex  rounded-3xl">
                    <div className="form-control w-full max-w-xs">
                        <h1 className="text-5xl">Connectez-vous</h1>

                        {/* Login */}
                        <p className="text-black bg-green-200 text-center">
                            {successMessage}
                        </p>
                        <p className="text-black bg-red-200 text-center">
                            {errorMessage}
                        </p>

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
