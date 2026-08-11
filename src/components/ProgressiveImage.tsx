import { useState, ImgHTMLAttributes } from 'react';

interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export default function ProgressiveImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  loading = 'lazy',
  fetchPriority,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-tawerna-wood/30 ${containerClassName}`}>
      {/* Skeleton pulse shown before image load */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-tawerna-wood/40 animate-pulse pointer-events-none z-0" />
      )}
      
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={() => setIsLoaded(true)}
        referrerPolicy="no-referrer"
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </div>
  );
}
