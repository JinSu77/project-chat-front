import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './containers/login/login';
import Register from './containers/register/register';
import './App.css';
import Dashboard from './containers/dashboard/dashboard';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const UnAuthenticatedRoute: React.FC = () => {
    const token = useSelector((state: RootState) => state.authentication.token);

    if (token) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return <Outlet />;
};

const AuthenticatedRoute: React.FC = () => {
    const token = useSelector((state: RootState) => state.authentication.token);

    if (!token) {
        return <Navigate to="/" replace={true} />;
    }

    return <Outlet />;
};

function App(): JSX.Element {
    return (
        <>
            <Routes>
                <Route element={<UnAuthenticatedRoute />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<AuthenticatedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </>
    );
}

export default App;
