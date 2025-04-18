import React, { useState } from "react";

import style from './SignupForml.module.css';
import { Link } from "react-router-dom";
import { Button } from "../../ui";
import defaultProfileImg from '../../../images/default-profile-img.png'
interface SignUpProps {
  onSubmit: (username: string, email: string, password: string, image: File) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>(defaultProfileImg as unknown as File);
  
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) setSelectedFile(file)
    else setSelectedFile(defaultProfileImg as unknown as File);
  };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(username, email, password, selectedFile);       
    };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="username"
            name="username"
          />
        </div>
        <div>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email"
            name="email"
          />
        </div>
        <div>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
            name="password"
          />
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
          {selectedFile && <p className={style.selectedFile}>{selectedFile.name}</p>}
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
