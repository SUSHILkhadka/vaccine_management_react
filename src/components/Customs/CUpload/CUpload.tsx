import { message, Spin, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadToCloud } from '../../../axios/backendUpload';
import { imageURL } from '../../../constants/common';
import { changePhotoUrl } from '../../../redux_toolkit/slices/vaccineSlice';
import { RootState } from '../../../redux_toolkit/stores/store';
import { resizeFile } from '../../../utils/imageCompressor';
import './CUpload.scss';

const CustomUpload: React.FC = () => {
  const vaccineInfo = useSelector((state: RootState) => state.vaccine);
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);

  const props: UploadProps = {
    beforeUpload: async (file) => {
      if (file.type.split('/')[0] != 'image') {
        message.error('File type error. Please select image');
        return false;
      }

      setloading(true);
      const formData = new FormData();
      console.log('before', file);
      const resizedFile = (await resizeFile(file)) as File;
      console.log('after', resizedFile);

      formData.append('keyForFileObject', resizedFile);
      try {
        const response = await uploadToCloud(formData);
        dispatch(changePhotoUrl(response.url));
        message.success('upload successfully.');
      } catch (e) {
        message.error('uploading error');
      }
      setloading(false);
      return false;
    },
    maxCount: 1,
    showUploadList: false,
  };
  return (
    // <ImgCrop rotate>
      <Upload {...props}>
        <div className='customphoto--container'>
          <div className='image--container'>
            {Boolean(vaccineInfo.photoUrl) ? (
              <img
                className='img--avatar'
                src={vaccineInfo.photoUrl}
                alt='Loading'
              />
            ) : (
              <img className='img--avatar' src={imageURL} alt='loading' />
            )}
          </div>
          <div className='icon--container'>
            {loading ? <Spin /> : <div className='icon--plus'>+</div>}
          </div>
        </div>
      </Upload>
    // </ImgCrop>
  );
};

export default CustomUpload;
