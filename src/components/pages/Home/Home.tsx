import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Footer, Navbar } from '../../layout';
import React from 'react';
import style from './Home.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const Home: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.users);

  if (user === null) {
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
