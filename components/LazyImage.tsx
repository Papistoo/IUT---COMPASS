
import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, containerClassName, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName || ''}`}>
      {/* Squelette de chargement (Placeholder) */}
      {!isLoaded && !hasError && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10 ${className}`}>
           <ImageIcon className="text-gray-300 opacity-50" size={24} />
        </div>
      )}

      {/* Image Réelle */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
           setHasError(true);
           setIsLoaded(true);
        }}
        className={`transition-all duration-700 ease-out ${className} ${
          isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-105'
        }`}
        {...props}
      />

      {/* Fallback en cas d'erreur */}
      {hasError && (
         <div className={`absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-400 text-xs p-2 text-center border border-gray-200 ${className}`}>
            <ImageIcon size={20} className="mb-1" />
            <span>Image non disponible</span>
         </div>
      )}
    </div>
  );
};

export default LazyImage;
