import { Link } from 'react-router-dom';
import './register.css';
import IUserRegisterForm from '../../interfaces/auth/IUserRegisterForm';
import React, { useEffect, useState } from 'react';
import useApiFetch, { FetchProps } from '../../hooks/useApiFetch';

function Register(): JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [fetchData, { data, error, isLoading }] = useApiFetch();
    const userRegisterForm: IUserRegisterForm = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        username: '',
    };

    useEffect(() => {
        console.log('[Register] Activation useEffect');

        if (data) {
            setSuccessMessage(
                'Inscription réussie, vous pouvez retourner à la page de connexion.'
            );
        }

        return () => {};
    }, [data, error]);

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        userRegisterForm.email = email;
        userRegisterForm.firstName = firstName;
        userRegisterForm.lastName = lastName;
        userRegisterForm.password = password;
        userRegisterForm.username = username;

        const fetchProps: FetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            url: 'http://localhost:8000/auth/register',
            body: { ...userRegisterForm },
        };

        await fetchData(fetchProps);
    };

    return (
        <>
            <button className="btn btn-primary">
                <Link to="/">Login</Link>
            </button>

            <div className="registerFormContainer">
                <section className="registerFormSection">
                    <form onSubmit={handleFormSubmit} className="registerForm">
                        <h1>Inscription</h1>

                        {/* Register */}
                        <p className="text-black bg-green-200 text-center">
                            {successMessage}
                        </p>

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

                        {error && (
                            <p className="text-black bg-red-200 text-center">
                                {error}
                            </p>
                        )}

                        {errorMessage && (
                            <p className="text-black bg-red-400 text-center mt-5 max-w-xs">
                                {errorMessage}
                            </p>
                        )}

                        {/* 
            Utiliser le composant INPUT
          */}

                        <label className="label">
                            <span>Nom</span>
                        </label>

                        <input
                            name="lastName"
                            type="text"
                            placeholder="Entrez votre nom"
                            className="input input-bordered w-full max-w-xs rounded-xl"
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                            minLength={4}
                            required
                        />

                        <label className="label">
                            <span>Prénom</span>
                        </label>

                        <input
                            name="firstName"
                            type="text"
                            placeholder="Entrez votre prénom"
                            className="input input-bordered w-full max-w-xs rounded-xl"
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                            minLength={4}
                            required
                        />

                        <label className="label">
                            <span>Nom d&apos;utilisateur</span>
                        </label>

                        <input
                            name="username"
                            type="text"
                            placeholder="Entrez un nom d'utilisateur"
                            className="input input-bordered w-full max-w-xs rounded-xl"
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            minLength={4}
                            required
                        />

                        <label className="label">
                            <span>Adresse email</span>
                        </label>

                        <input
                            name="email"
                            type="email"
                            placeholder="Entrez une adresse email"
                            className="input input-bordered w-full max-w-xs rounded-xl"
                            onChange={(event) => setEmail(event.target.value)}
                            minLength={4}
                            required
                        />

                        <label className="label">
                            <span>Mot de passe</span>
                        </label>

                        <input
                            name="password"
                            type="password"
                            placeholder="Entrez un mot de passe"
                            className="input input-bordered w-full max-w-xs rounded-xl"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            minLength={4}
                            required
                        />

                        <label className="label">
                            <span>Confirmez le mot de passe</span>
                        </label>

                        <input
                            name="passwordConfirm"
                            type="password"
                            placeholder="Confirmez le mot de passe"
                            className="input input-bordered w-full max-w-xs rounded-xl"
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            minLength={4}
                            required
                        />

                        <button className="btn btn-primary mt-2">
                            Register
                        </button>
                        {/* Register */}

                        <p>
                            Déjà un compte ? Clique{' '}
                            <Link to="/" className="text-sky-700 ">
                                ici
                            </Link>
                        </p>
                    </form>
                </section>
            </div>
        </>
    );
}

export default Register;
