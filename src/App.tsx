import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './containers/login/login';
import Register from './containers/register/register';
import Conversation from './containers/conversation/conversation';
import './App.css';
import Dashboard from './containers/dashboard/dashboard';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import TestingComponent from './containers/test/TestingComponent';

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
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/conversation" element={<Conversation />} />

                <Route element={<AuthenticatedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/test" element={<TestingComponent />} />
                </Route>

                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </>
    );
}

export default App;
