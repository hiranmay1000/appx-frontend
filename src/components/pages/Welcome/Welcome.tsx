import React from 'react';
import style from './Welcome.module.css';
import { Button } from '../../ui';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className={style.welcomeContainer}>
            <h1>Application X</h1>
            <br/>
            <p>
                This is a basic user authentication app built by a newbie developer. The application was created to gain insights into how React works with TypeScript. Additionally, this application utilizes Redux with Saga for state management. Overall, it serves as an illustration of a project built by a developer who has successfully gained knowledge in this domain.
            </p>
            <br/>
            <div>
                <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button onClick={() => navigate('/vault')}>Vault 🗃️</Button>
            </div>
        </div>
    );
}

export default Welcome;