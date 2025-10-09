
import React from 'react';

interface ImageViewerProps {
  title: string;
  src: string | null;
  filter?: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ title, src, filter = '' }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-center text-brand-gray-700 mb-2">{title}</h3>
      <div className={`w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden shadow-inner transition-colors ${
          src ? 'bg-brand-gray-200' : 'bg-brand-gray-50 border-2 border-dashed border-brand-gray-300'
        }`}>
        {src ? (
          <img
            src={src}
            alt={title}
            className={`object-contain w-full h-full transition-all duration-500 ${filter}`}
          />
        ) : (
          <div className="text-center text-gray-400 p-4">
            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <p className="mt-2 text-sm">{
                title === 'Processed Image' 
                ? 'Your processed image will appear here.'
                : 'Upload an image to see it here.'
            }</p>
          </div>
        )}
      </div>
    </div>
  );
};
