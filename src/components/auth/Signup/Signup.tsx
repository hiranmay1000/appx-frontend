import React, { useEffect } from "react";
import { Modal, Spinner } from "../../ui";
import SignUpForm from "../Signup/SignupForm";
import signupBanner from '../../../images/signup-img.jpg';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../store/slices/user.slices";
import { RootState } from "../../../store/store";
import { useToast } from "../../../context/ToastContext";

const Signup: React.FC = () => {
  const {user, error, isLoading} = useSelector((state: RootState) => state.users);
  const {showToast } = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignupFormSubmit = async (username: string, email: string, password: string, image?: File) => {    
    dispatch(signupUser({ username, email, password, image }));
  }
  
  useEffect(() => {
    if (user?.email) {
      setTimeout(() => navigate('/'), 2000);
      showToast("User signed up successfully:", 'success');
      
    } else if (error) {
      console.error("Error signing up:", error);
    }
  }, [user, error, navigate, showToast  ]);

  return (
        <>
          <Modal  title="Signup" src = {signupBanner}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Spinner />
              <br />
              <p>Creating new user...</p>
            </div>
          ) : (
            <SignUpForm onSubmit={handleSignupFormSubmit} />
          )}
          </Modal>
      </>
  );
};

export default Signup;
