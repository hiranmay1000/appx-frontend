import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Button } from '../../ui';
import { editImage } from '../../../store/slices/user.slices';
import { API_URL } from '../../../config';

import style from './EditImage.module.css';

const EditImage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsUploaded(true);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
  };

  const handleChangeClick = () => {
    if (selectedFile) {
      dispatch(editImage({ image: selectedFile }));
    }
    setSelectedFile(null);
  };

  return (
    <div className={style.editImagePage}>
      <div>
        <div className={style.editImageContainer}>
          <div >
            <img src={`${API_URL}${user?.image}`} alt={user?.username} className={style.previewImage} />
          </div>

          {isUploaded && (
            <>⇄
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {previewUrl && <img src={previewUrl} alt="Preview" className={style.previewImage} />}
              </div>
            </>
          )}
        </div>

        <div className={style.editImageButton}>
          {selectedFile ? (
            <Button onClick={handleChangeClick} background='brown'>Change Image</Button>
          ) : (
            <input type="file" name="image" id="image" onChange={handleFileChange} onClick={handleUploadClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditImage;
