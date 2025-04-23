import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Button, Spinner } from '../../ui';
import { editImage } from '../../../store/slices/user.slices';
import { API_URL } from '../../../config';

import style from './EditImage.module.css';

const EditImage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setloading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedFile(file);
      setIsUploaded(true);
      setloading(false);
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
    setloading(true);
  };

  const handleUploadDiffClick = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setloading(true);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setTimeout(() => {
      inputRef.current?.click();
    }, 0);
  }

  const handleUpdateClick = () => {
    if (selectedFile) {
      dispatch(editImage({ image: selectedFile, userId: user?._id!, oldImagePath: user?.image! }));
      setIsUploaded(false);
      setPreviewUrl(null);
    }
    setSelectedFile(null);
  };

  return (
    <div className={style.editImagePage}>
      <div className={style.editImageWrapper}>
        <h1 className={style.title}>Change Profile Picture</h1>
        <div className={style.editImageContainer}>
          <div >
            <img src={`${API_URL}${user?.image}`} alt={user?.username} className={style.previewImage}/>
          </div>

          {isUploaded && (
            <> {previewUrl && (<p>⇄</p>)}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                  {loading && <Spinner />}
                </div>
                {previewUrl && !loading && <img src={previewUrl} alt="Preview" className={style.previewImage} />}
              </div>
            </>
          )}
        </div>

        <div className={style.editImageButton}>
          {selectedFile ? (
            <>
              <Button onClick={handleUploadDiffClick} >Upload Different</Button>
              <Button onClick={handleUpdateClick} background='brown'>Update Image</Button>
            </>
          ) : (
            <div className={style.uploadImage} onClick={handleUploadClick}>
              <p>Select image ╋</p>
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                className={style.fileInput}
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditImage;
