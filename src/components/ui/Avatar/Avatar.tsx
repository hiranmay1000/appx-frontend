import React, { useState } from 'react';
import './Avatar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


interface AvatarPropsType{
    src?: string,
}

const Avatar: React.FC<AvatarPropsType> = ({src}) => {
    const imageSrc = src || '/images/default-user-img.png';
    const [showLogout, setShowLogout] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.users);

    const handleOnAvatarClick = () => {
        navigate('/profile');
        setShowLogout(!showLogout);
        console.log(user)
    }
    
    return (
        <>
        <div className="avatar-hero-container" onClick={handleOnAvatarClick}>
            <div className="avatar-img">
                <img src={imageSrc} alt="profile"/>
            </div>
            <div className="avatar-name">
                <p>{user?.username}</p>
            </div>
        </div>
        </>
    )
}


export default Avatar;