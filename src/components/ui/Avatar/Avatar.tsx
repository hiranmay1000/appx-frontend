import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import defaultImg from '../../../images/default-profile-img.png';

import './Avatar.css';


const Avatar: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.users);  
    const navigate = useNavigate();

    const [src, setSrc] = useState<string>(defaultImg);
    const [alt, setAlt] = useState<string>('user image');
    const [showLogout, setShowLogout] = useState<boolean>(false);


    useEffect(() => {
        if (user?.image) {
            setSrc(user.image);
        }
        if (user?.username) {
            setAlt(user.username);
        }
    }, [user]);

    const handleOnAvatarClick = () => {
        navigate('/profile');
        setShowLogout(!showLogout);
    }

    return (
        <div className="avatar-hero-container" onClick={handleOnAvatarClick}>
            <div className="avatar-img">
                <img src={src} alt={alt}/>
            </div>
            <div className="avatar-name">
                <p>{user?.username}</p>
            </div>
        </div>
    );
}

export default Avatar;