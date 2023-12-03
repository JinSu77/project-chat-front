import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Login from './containers/login/login';
import Register from './containers/register/register';
import Conversation from './containers/conversation/conversation';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import PrepareImplementation from './containers/test/PrepareImplementation';

const AuthenticatedRoutes: React.FC = () => {
    const isLoggedIn = useSelector(
        (state: RootState) => state.authentication.loggedIn
    );
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

function App(): JSX.Element {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<AuthenticatedRoutes />}>
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    <Route path="/test" element={<PrepareImplementation />} />
                    <Route path="/" element={<Conversation />} />
                </Route>

                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </>
    );
}

export default App;
