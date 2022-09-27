import Resizer from 'react-image-file-resizer';
import { IMAGE_COMPRESSION_PERCENTAGE } from '../constants/common';
export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      'JPEG',
      IMAGE_COMPRESSION_PERCENTAGE,
      0,
      (uri) => {
        resolve(uri);
      },
      'file'
    );
  });
