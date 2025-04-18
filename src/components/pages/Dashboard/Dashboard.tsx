import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui';
import style from './Dashboard.module.css';

import React from 'react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={style.dashboardContainer}>
      <>
        <h1>Welcome to AppX, powered by React</h1>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, obcaecati. Facilis
          maiores sequi error nemo ratione?
        </p>
        <Button onClick={() => navigate('/vault')}> Vault 🗃️</Button>
      </>
    </div>
  );
};

export default Dashboard;
