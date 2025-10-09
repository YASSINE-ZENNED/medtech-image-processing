import { ProcessingPhase } from '../types';

const BACKEND_URL = 'https://zenned-ai-tech-test.hf.space/process';

/**
 * Calls the backend API to process an image.
 *
 * @param imageFile The image file to process.
 * @param phase The processing phase to apply ('arterial' or 'venous').
 * @returns A promise that resolves with the base64 string of the processed image.
 */
export const processImage = async (imageFile: File, phase: ProcessingPhase): Promise<string> => {
  console.log(`Sending image to backend for phase: ${phase}`);

  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('phase', phase);

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      // If response is not OK, throw an error with the message from the backend
      throw new Error(data.error || 'An unknown error occurred on the server.');
    }

    if (data.success && data.processed_image) {
      return data.processed_image;
    } else {
      // Handle cases where the response is OK but doesn't contain the expected data
      throw new Error(data.error || 'Backend response was successful but did not contain a processed image.');
    }
  } catch (error) {
    console.error('API call failed:', error);
    // Re-throw the error so it can be caught by the calling component
    if (error instanceof Error) {
        // Prepending a user-friendly message to the technical error from the backend.
        throw new Error(`Server Error: ${error.message}`);
    }
    throw new Error('A network error occurred. Please check your connection.');
  }
};