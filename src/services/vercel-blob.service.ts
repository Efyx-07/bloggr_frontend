import type { PutBlobResult } from '@vercel/blob';
import { compressImage } from '@/utils/compressImage';

// Envoie l'image après l'avoir compressée sur vercel blob en utilisant la route API
// ===========================================================================================
export async function loadBlob(
  selectedFile: File | null,
): Promise<PutBlobResult> {
  if (!selectedFile) throw new Error('No file selected');
  const compressedFile: File = await compressImage(selectedFile);
  const response = await fetch(`/api/file?filename=${compressedFile.name}`, {
    method: 'POST',
    body: compressedFile,
  });
  const newBlob: PutBlobResult = await response.json();
  return newBlob;
}

// Efface une image de vercel blob en utilisant la route API
// ===========================================================================================
export async function deleteFromVercelBlob(url: string): Promise<void> {
  try {
    const response = await fetch(`/api/file`, {
      method: 'DELETE',
      body: JSON.stringify({
        url,
      }),
    });
    if (response.ok) return;
    else
      throw new Error(
        'Failed to delete image from Vercel blob' + response.statusText,
      );
  } catch (error) {
    throw new Error('Failed to delete image from Vercel blob' + error);
  }
}
