/* import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'; */
import './dashboard.css';

export default function Dashboard(): JSX.Element {
    /*     const token = useSelector((state: RootState) => state.authentication.token);
    const dispatch = useDispatch(); */

    return (
        <>
            <section className="body-dashboard">
                <div className="main-dashboard">
                    <div className="bg-black w-full h-full flex justify-center">
                        <button className="btn w-1/6 btn-primary">
                            Channels
                        </button>
                        <button className="btn w-1/6 btn-primary">
                            Conversations
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
