import React from 'react';
import { COLORS } from '@/constants';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className = '',
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizes[size]} border-4 border-[#05AA87] border-t-transparent rounded-full animate-spin`} />
      {text && (
        <p className="mt-4 text-[#05AA87] font-medium text-center">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
