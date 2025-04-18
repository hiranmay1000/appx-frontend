import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../ui';

import './Navbar.css';

import React from 'react';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    }

    return <nav>
                <div className="logo" onClick={handleLogoClick}>
                    <h4>APPX</h4>
                </div>
                <div className="user-profile-logo">
                    <Avatar src={''}/>
                </div>
            </nav>
}

export default Navbar;