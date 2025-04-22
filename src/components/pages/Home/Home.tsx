import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Footer, Navbar } from '../../layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import style from './Home.module.css';

const Home: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.users);

  if (user === null || user === undefined) {    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className={style.homeContainer}>
      <Navbar />
      <div className={style.contentWrapper}>
        <div className={style.ContentContainer}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
