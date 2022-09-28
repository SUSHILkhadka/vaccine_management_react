import Resizer from 'react-image-file-resizer';

export const getCompressionPercentForFixedSize = (presentFileSize: number, fixedFileSize: number) => {
  if (presentFileSize <= fixedFileSize) {
    return 100;
  } else {
    return Math.round((100 * fixedFileSize) / presentFileSize);
  }
};

const maxWidth = 300;
export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxWidth,
      'JPEG',
      50,
      0,
      (uri) => {
        resolve(uri);
      },
      'file'
    );
  });
