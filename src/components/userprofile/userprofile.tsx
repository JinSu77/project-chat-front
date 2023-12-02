import React from 'react';
import './userprofile.css';
import avatar_default from '../../assets/avatar_default.jpg';

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
                    <img src={avatar_default} alt="Profile" />
                </div>
                <h4>Tom Bonnet</h4>
                <p>Etudiant en informatique</p>
            </div>
            <div className="profile__card">
                <div className="card__header" onClick={toggleInfo}>
                    <h4>Mes infos :</h4>
                    <i className="fa fa-angle-down"></i>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
