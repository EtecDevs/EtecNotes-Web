import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  closeOnOverlay = true 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className={`bg-white dark:bg-gray-800 rounded-lg ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden `}>
       

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Componente para conteúdo do modal
export const ModalContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Componente para footer do modal
export const ModalFooter = ({ children, className = '' }) => (
  <div className={`flex justify-end space-x-4 p-6 border-t border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 ${className}`}>
    {children}
  </div>
);

export default Modal;