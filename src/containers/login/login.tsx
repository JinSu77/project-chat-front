import { Link } from 'react-router-dom';
import './login.css';
import '../../data/auth';
import jauneBleuBlur from '../../assets/login/jaune-bleu-blur.png';
import monsieurLogin from '../../assets/login/monsieur-login.png';

function Login() {

  return (
    <body className='login-body'>
      <div className="flex justify-center h-screen p-10">

        <section className='bg-white w-full pt-10 pb-10 pl-3 pr-3 flex  rounded-3xl'>
          <div className="form-control w-full max-w-xs">

            <h1 className='text-5xl'>Connectez-vous</h1>

            <label className="label">
              <span className="label-text">Identifiant</span>
            </label>

            <input
              type="text"
              placeholder="Entrez un identifiant"
              className="input input-bordered w-full max-w-xs rounded-xl"
            />

            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>

            <input
              type="password"
              placeholder="Entrez un mot de passe"
              className="input input-bordered w-full max-w-xs bg- rounded-xl"
            />

            <button className="btn btn-primary mt-2">Login</button>
            <p>Pas de compte ? Clique <Link to="/" className='text-sky-700 '>ici</Link></p>
            <img src={jauneBleuBlur} alt="Image 1" />
            <img src={monsieurLogin} alt="Image 2" />
          </div>
        </section>
      </div>
    </body>
  )
}

export default Login;