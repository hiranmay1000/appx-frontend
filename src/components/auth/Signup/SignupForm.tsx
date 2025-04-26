import React, { useState } from "react";

import style from './SignupForml.module.css';
import { Link } from "react-router-dom";
import { Button, Toast } from "../../ui";
import defaultProfileImg from '../../../images/default-profile-img.png'
import { setToastMessage } from "../../../store/slices/user.slices";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface SignUpProps {
  onSubmit: (username: string, email: string, password: string, image?: File) => void;
}

type userInput = {
  email: string,
  password: string,
  username: string,
  previewImg: string,
  selectedFile: File | null
}


const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
  const { toastMessage } = useSelector((state: RootState) => state.users);

  const [userInput, setUserInput] = useState<userInput>({
    email: '',
    password: '',
    username: '',
    previewImg: defaultProfileImg,
    selectedFile: null
  })

  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const [username, setUsername] = useState<string>('');
  // const [previewImg, setPreviewImg] = useState<string>(defaultProfileImg);
  // const [selectedFile, setSelectedFile] = useState<File>();
  const [passwordStatus, setPasswordStatus] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasDigit: false,
    hasSpecialChar: false,
    hasMinLength: false
  });


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setUserInput(prev => ({
        ...prev,
        selectedFile: file,
        previewImg: URL.createObjectURL(file)
      }))
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordStatus.hasLowercase && passwordStatus.hasUppercase && passwordStatus.hasDigit && passwordStatus.hasSpecialChar && passwordStatus.hasMinLength) {
        onSubmit(userInput.username, userInput.email, userInput.password, userInput.selectedFile || undefined);
    } else {
      setToastMessage({ message: "Password condition does not met!", color: "red" });
    }
  };

  const checkPassword = (password: string) => {
    const status = {
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasDigit: /\d/.test(password),
      hasSpecialChar: /[\W_]/.test(password),
      hasMinLength: password.length >= 8
    };

    setPasswordStatus(status);
  }

  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    checkPassword(inputPassword);
    setUserInput(prev => ({
      ...prev,
      password: inputPassword
    }))
  }

  return (
    <>
      {toastMessage && <Toast />}
      <div className={style.previewImgContainer}>
        <img src={userInput.previewImg} alt={userInput.username} />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={userInput.username}
            onChange={(e) => setUserInput(prev => ({...prev, username: e.target.value}))}
            required
            placeholder="username"
            name="username"
          />
        </div>
        <div>
          <input
            type="email"
            value={userInput.email}
            onChange={(e) => setUserInput(prev => ({...prev, email: e.target.value}))}
            required
            placeholder="email"
            name="email"
          />
        </div>
        <div>
          <input
            type="password"
            value={userInput.password}
            onChange={handleChangePass}
            required
            placeholder="password"
            name="password"
          />
        </div>
        <div className={style.passwordWarnings}>
          <p style={{ color: passwordStatus.hasMinLength ? 'green' : 'crimson' }}>8 chars</p>
          |
          <p style={{ color: passwordStatus.hasSpecialChar ? 'green' : 'crimson' }}>Special character</p>
          |
          <p style={{ color: passwordStatus.hasUppercase ? 'green' : 'crimson' }}>Uppercase</p>
          |
          <p style={{ color: passwordStatus.hasLowercase ? 'green' : 'crimson' }}>Lowercase</p>
          |
          <p style={{ color: passwordStatus.hasDigit ? 'green' : 'crimson' }}>Number</p>
        </div>

        <div className={style.imageUpload}>
          <label className={style.customFileUpload}>
            📁 Choose Image
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </label>
        </div>
        <Button>Sign Up ➜</Button>
      </form>
      <p className={style.formText}>Already have an account, please
        <Link to={'/login'}> login</Link>!
      </p>
    </>
  );
};

export default SignUp;
