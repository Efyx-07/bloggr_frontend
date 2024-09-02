// Utilise la librairie 'browser-image-compression' pour compresser une image
import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 500,
    useWebWorker: true,
  };
  return imageCompression(file, options);
}
