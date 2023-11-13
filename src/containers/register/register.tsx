import { Link } from 'react-router-dom';
import './register.css';
import IUserRegisterForm from '../../interfaces/auth/IUserRegisterForm';
import { useState } from 'react';

function Register() {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const userRegisterForm: IUserRegisterForm = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: '',
  };

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
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

    fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userRegisterForm),
    }) // => Renvoie une Promise<Response>
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        /* Toujours une erreur API */
        return response.json().then((err) => {
          if (err.data.error) {
            throw new Error(err.data.error);
          }

          if (err.data.errors) {
            throw new Error(err.data.errors);
          }
        });
      }) // Ici on a complété la Promise on doit gérer ce qu'on a reçu
      .then((data) => {
        console.log("user id : ", data.data.user.id);
        setSuccessMessage('Inscription réussie');
      }) // En cas de réussite sur le premier then, on affiche la data reçue.
      .catch((error) => {
        /* Pas toujours une erreur API exemple erreur cors */
        console.log(error);

        if (error.message) {
          setErrorMessage(error.message);
        }
      });
    
  }


  return (
  <>
    <button className="btn btn-primary"><Link to="/">Login</Link></button>

    

    <div className="registerFormContainer">

      <section className='registerFormSection'>
        <form onSubmit={handleFormSubmit} className='registerForm'>
          <h1>Inscription</h1>

          {/* Register */}
          <p className='text-black bg-green-200 text-center'>{successMessage}</p>

          {/* 
            Utiliser le composant INPUT
          */}

          <label className='label'>
            <span>Nom</span>
          </label>

          <input
            name='lastName'
            type="text"
            placeholder="Entrez votre nom"
            className="input input-bordered w-full max-w-xs rounded-xl"
            onChange={(event) => setLastName(event.target.value)}
            minLength={4}
            required
          />

          <label className='label'>
            <span>Prénom</span>
          </label>

          <input
            name='firstName'
            type="text"
            placeholder="Entrez votre prénom"
            className="input input-bordered w-full max-w-xs rounded-xl"
            onChange={(event) => setFirstName(event.target.value)}
            minLength={4}
            required
          />


          <label className='label'>
            <span>Nom d'utilisateur</span>
          </label>

          <input
            name='username'
            type="text"
            placeholder="Entrez un nom d'utilisateur"
            className="input input-bordered w-full max-w-xs rounded-xl"
            onChange={(event) => setUsername(event.target.value)}
            minLength={4}
            required
          />

          <label className='label'>
            <span>Adresse email</span>
          </label>

          <input
            name='email'
            type="email"
            placeholder="Entrez une adresse email"
            className="input input-bordered w-full max-w-xs rounded-xl"
            onChange={(event) => setEmail(event.target.value)}
            minLength={4}
            required
          />

          <label className='label'>
            <span>Mot de passe</span>
          </label>

          <input
            name='password'
            type="password"
            placeholder="Entrez un mot de passe"
            className="input input-bordered w-full max-w-xs rounded-xl"
            onChange={(event) => setPassword(event.target.value)}
            minLength={4}
            required
          />

          <label className='label'>
            <span>Confirmez le mot de passe</span>
          </label>

          <input
            name='passwordConfirm'
            type="password"
            placeholder="Confirmez le mot de passe"
            className="input input-bordered w-full max-w-xs rounded-xl"
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength={4}
            required
          />

          <p className='text-black bg-red-400 text-center mt-5 max-w-xs'>{errorMessage}</p>

          <button className="btn btn-primary mt-2">
            Register
          </button>
          {/* Register */}

          <p>
            Déjà un compte ? Clique <Link to="/" className='text-sky-700 '>ici</Link>
          </p>
        </form>
      </section>
    </div>
  </>
  )
}

export default Register