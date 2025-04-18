import React, { useEffect, useState } from "react";
import { Modal, Spinner, Toast } from "../../ui";
import LoginForm from "./LoginForm";
import loginBanner from '../../../images/login-banner.jpg';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/slices/user.slices";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, isLoading } = useSelector((state: RootState) => state.users);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastColor, setToastColor] = useState('red');

  useEffect(() => {
    if (user?.email) {
      setToastColor('green');
      setToastMessage('Login successful!');
      setTimeout(() => navigate('/'), 1000);
    } else if (error) {
      setToastColor('red');
      setToastMessage(error);
    }
    setTimeout(() => setToastMessage(null), 5000);
    
  }, [user, error, navigate]);

  const handleLoginSubmit = async (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      <Modal title="Login" src={loginBanner} boxHeight="65%">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Spinner />
            <p>Logging you in...</p>
          </div>
        ) : (
          <LoginForm onSubmit={handleLoginSubmit} />
        )}      
      </Modal>

      {toastMessage && <Toast key={Date.now()} message={toastMessage} color={toastColor} />}
      </>
  );
};

export default Login;
