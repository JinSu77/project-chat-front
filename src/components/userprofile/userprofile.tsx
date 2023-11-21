import React from 'react';
import './userprofile.css';

const UserProfile: React.FC = () => {
    const toggleInfo = (e: React.MouseEvent<HTMLDivElement>): void => {
        const target = e.currentTarget;
        if (target.parentNode) {
            target.parentNode.classList.toggle('open');
        }
    };

    return (
        <div className="main__userprofile">
            <div className="profile__card user__profile__image">
                <div className="profile__image">
                    <img
                        src="../../assets/login/profilphoto.jpg"
                        alt="Profile"
                    />
                </div>
                <h4>Tom Bonnet</h4>
                <p>Suceur de queue professionel</p>
            </div>
            <div className="profile__card">
                <div className="card__header" onClick={toggleInfo}>
                    <h4>Information</h4>
                    <i className="fa fa-angle-down"></i>
                </div>
                <div className="card__content">
                    Je peut te le faire dans tout les sens, en 69,en faisant le
                    poireau , sous la table , sous le lit , sous ton père{' '}
                    <br></br>
                    Contacte toi si interréssé
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
