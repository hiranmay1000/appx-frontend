import React, { useState } from 'react';
import style from './EditImage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Button } from '../../ui';
import { editImage } from '../../../store/slices/user.slices';

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
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    setIsUploaded(true);
  };

  const handleChangeClick = () => {
    if (selectedFile) {
      dispatch(editImage({ image: selectedFile }));
    }
    setSelectedFile(null);
  };

  return (
    <div className={style.editImagePage}>
      <div className={style.editImageContainer}>
        <div >
          <img src={user?.image} alt={user?.username} className={style.previewImage} />
        </div>

        {isUploaded && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
            {previewUrl && <img src={previewUrl} alt="Preview" className={style.previewImage} />}
          </div>
        )}
      </div>

      {selectedFile ? (
          <Button onClick={handleChangeClick} background='brown'>Change Image</Button>
        ) : (
          <input type="file" name="image" id="image" onChange={handleFileChange} onClick={handleUploadClick}/>
        // <Button onClick={handleUploadClick}>Upload</Button>
      )}
    </div>
  );
};

export default EditImage;
