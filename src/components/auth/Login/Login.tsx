import React, { useEffect, useState } from "react";
import { Modal, Spinner, Toast } from "../../ui";
import LoginForm from "./LoginForm";
import loginBanner from '../../../images/login-banner.jpg';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/slices/user.slices";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useToast } from "../../../context/ToastContext";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showToast} = useToast();

  const { user, error, isLoading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (user?.email) {
      navigate('/');
    } else if (error) {
      showToast(error, 'error');
    }    
  }, [user, error, navigate]);

  const handleLoginSubmit = async (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      <Modal title="Login" src={loginBanner}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Spinner />
            <p>Logging you in...</p>
          </div>
        ) : (
          <LoginForm onSubmit={handleLoginSubmit} />
        )}      
      </Modal>

      <Toast />
      </>
  );
};

export default Login;
