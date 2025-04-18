import React, { useState } from "react";

import style from './LoginForm.module.css';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className={style.formWrapper}>
      <div className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email"
            />
          </div>
          <div>
            <input 
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
            />
          </div>
          <p className={style.forgotPassText} onClick={() => navigate('/resetpassword')}>Forgot password?</p>
          <Button>➜ Login</Button>
        </form>
        <p className={style.formText}>
          New to UApp? <Link to="/signup" className={style.signupLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
