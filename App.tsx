import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PhaseSelector } from './components/PhaseSelector';
import { ImageViewer } from './components/ImageViewer';
import { Spinner } from './components/Spinner';
import { Alert } from './components/Alert';
import { ProcessingPhase } from './types';
import { processImage } from './services/imageProcessingService';

const App: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [phase, setPhase] = useState<ProcessingPhase>(ProcessingPhase.Arterial);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File | null) => {
    // Clear everything if file is null
    if (!file) {
      setOriginalImageFile(null);
      setOriginalImagePreview(null);
      setProcessedImage(null);
      setError(null);
      return;
    }

    setOriginalImageFile(file);
    setProcessedImage(null);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProcessImage = useCallback(async () => {
    if (!originalImageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setProcessedImage(null);

    try {
      const processedImageData = await processImage(originalImageFile, phase);
      setProcessedImage(processedImageData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, phase]);

  return (
    <div className="min-h-screen bg-brand-gray-100 font-sans text-brand-gray-900">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 space-y-8">
          
          <div>
            <h2 className="text-xl font-semibold text-brand-gray-700 border-b pb-2 mb-4">1. Upload Image</h2>
            <ImageUploader onImageUpload={handleImageUpload} fileName={originalImageFile?.name ?? null} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-brand-gray-700 border-b pb-2 mb-4">2. Select Phase</h2>
            <PhaseSelector selectedPhase={phase} onPhaseChange={setPhase} />
          </div>

          <div className="text-center">
            <button
              onClick={handleProcessImage}
              disabled={!originalImageFile || isLoading}
              className="w-full md:w-auto px-12 py-3 bg-brand-blue text-white font-bold rounded-lg shadow-md hover:bg-brand-blue-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
            >
              {isLoading ? 'Processing...' : 'Process Image'}
            </button>
          </div>
          
          {error && <Alert message={error} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <ImageViewer
              title="Original Image"
              src={originalImagePreview}
            />
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 rounded-lg z-10">
                  <Spinner />
                </div>
              )}
              <ImageViewer
                title="Processed Image"
                src={processedImage}
              />
            </div>
          </div>
        </div>
        <footer className="text-center py-6 text-gray-500 text-sm">
            <p>Surgical Planning Simulation</p>
            <p className="mt-1">Image processing is handled by a dedicated backend server.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;