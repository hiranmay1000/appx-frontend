import React, { useEffect } from "react";
import { Modal, Spinner, Toast } from "../../ui";
import SignUpForm from "../Signup/SignupForm";
import signupBanner from '../../../images/signup-img.jpg';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage, signupUser } from "../../../store/slices/user.slices";
import { RootState } from "../../../store/store";

const Signup: React.FC = () => {
  const {user, error, isLoading, toastMessage} = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignupFormSubmit = async (username: string, email: string, password: string, image: File) => {    
    dispatch(signupUser({ username, email, password, image }));
    dispatch(setToastMessage({message: 'Signing up...', color: 'blue'}));
  }
  
  useEffect(() => {
    if (user?.email) {
      dispatch(setToastMessage({message: 'Signing up successful', color: 'green'}));
      setTimeout(() => navigate('/'), 2000);
      console.log("User signed up successfully:", user);
      
    } else if (error) {
      dispatch(setToastMessage({message: error, color: 'red'}));
      console.error("Error signing up:", error);
    }
  }, [user, error, navigate]);

  return (
        <>
          <Modal title="Signup" src = {signupBanner} boxHeight="80%">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Spinner />
              <p>Logging you in...</p>
            </div>
          ) : (
            <SignUpForm onSubmit={handleSignupFormSubmit} />
          )}
          </Modal>

          {toastMessage && <Toast key={Date.now()} message={toastMessage} />}
      </>
  );
};

export default Signup;
