import { useNavigate } from 'react-router-dom';
import { Button, Modal } from '../../ui';
import style from './Profie.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToastMessage, logoutUser } from '../../../store/slices/user.slices';
import { RootState } from '../../../store/store';
import { changePassword } from '../../../store/slices/user.slices';
import { API_URL } from '../../../config';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.users);

  const [isChangePassword, setChangePassword] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [showDeleteWarningModal, setShowDeleteWarningModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setTimeout(() => {
      dispatch(logoutUser());
      navigate('/login');
      dispatch(clearToastMessage());
    }, 1000);
  };

  const handleChangePassword = async () => {
    dispatch(changePassword({ email: user?.email, oldPassword, newPassword }));
    setChangePassword(false);
  };

  const handleEditImage = () => {
    navigate('/edit-image');
  }

  const handleDeleteClick = () => {
    setShowDeleteWarningModal(true);
  }

  return (
    <>
      <div className={style.profileContent}>
        {showDeleteWarningModal && (
          <Modal title='Are you sure?' outline={true} src={`${API_URL}${user?.image}`}>
            <div>
              <Button background='green' onClick={() => setShowDeleteWarningModal(false)}>Yes</Button>
              <Button background='brown' onClick={() => setShowDeleteWarningModal(false)}>Cancel</Button>
            </div>
          </Modal>

        )}
        <div className={style.imageWrapper}>
          <img src={`${API_URL}${user?.image}`} alt={user?.username} onClick={handleEditImage} />
          <p className={style.hoverText}>Edit Image✎</p>
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
          <div>
            <Button onClick={() => setChangePassword(true)}>Change Password</Button>
            <Button background='brown' onClick={handleDeleteClick}>Delete Profile</Button>
          </div>
        )}

        <p>_____________________</p>
        <div>
          <Button onClick={() => navigate('/')}>Home 🏠︎</Button>
          <Button onClick={() => navigate('/dashboard')}>Dashboard 📈</Button>
          <Button onClick={handleLogout} background='red'>Logout ➜</Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
