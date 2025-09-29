import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Carregando...' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-2 border-b-2 border-[#8C43FF] border-t-transparent ${sizes[size]}`} />
      {text && <p className="mt-2 text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;