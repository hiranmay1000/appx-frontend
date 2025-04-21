import { useNavigate } from 'react-router-dom';
import { Button, Toast } from '../../ui';
import style from './Profie.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToastMessage, logoutUser, setToastMessage } from '../../../store/slices/user.slices';
import { RootState } from '../../../store/store';
import { changePassword } from '../../../store/slices/user.slices';

const Profile: React.FC = () => {
  const { user, toastMessage, toastColor } = useSelector((state: RootState) => state.users);

  const [isChangePassword, setChangePassword] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setToastMessage({ message: 'Logout successfull', color: 'brown' }));
    setTimeout(() => {
      dispatch(logoutUser());
      navigate('/login');
      dispatch(clearToastMessage());
    }, 2000);
  };

  const handleChangePassword = async () => {
    dispatch(changePassword({ email: user?.email, oldPassword, newPassword }));
    setChangePassword(false);
    setTimeout(() => {
      dispatch(clearToastMessage());
    }, 5000);
  };

  const handleEditImage = () => {
    console.log('Edit image clicked');
    
    navigate('/edit-image');
  }

  return (
    <>
      <div className={style.profileContent}>
        <div className={style.imageWrapper}>
          <img src={user?.image} alt={user?.username} onClick={handleEditImage} />
          <p className={style.hoverText}>Edit ✎</p>
        </div>

        <br />
        <h5><strong>Username:</strong> {user?.username}</h5>
        <h5><strong>Email:</strong> {user?.email}</h5>


        {isChangePassword ? (
          <div className={style.changePasswordForm}>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button background='green' onClick={handleChangePassword}>Update Password</Button>
            <Button background={'red'} onClick={() => setChangePassword(false)}>Cancel</Button>
          </div>
        ) : (
          <Button onClick={() => setChangePassword(true)}>Change Password</Button>
        )}

        <p>_____________________</p>
        <div>
          <Button onClick={() => navigate('/')}>Home 🏠︎</Button>
          <Button onClick={() => navigate('/dashboard')}>Dashboard 📑</Button>
          <Button onClick={() => navigate('/vault')}>Vault </Button>
          <Button onClick={handleLogout} background='red'>Logout ➜</Button>
        </div>
      </div>

      {toastMessage && <Toast message={toastMessage} color={toastColor} />}
    </>
  );
};

export default Profile;
