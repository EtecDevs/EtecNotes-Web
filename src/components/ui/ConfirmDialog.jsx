import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'danger',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar'
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      iconColor: 'text-red-500',
      confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
      titleColor: 'text-red-600'
    },
    warning: {
      iconColor: 'text-yellow-500',
      confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white',
      titleColor: 'text-yellow-600'
    },
    info: {
      iconColor: 'text-blue-500',
      confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
      titleColor: 'text-blue-600'
    }
  };

  const styles = typeStyles[type] || typeStyles.danger;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-xl max-w-md w-full border dark:border-[#333333]">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`flex-shrink-0 ${styles.iconColor} mr-3`}>
              <AlertTriangle size={24} />
            </div>
            <h3 className={`text-lg font-semibold ${styles.titleColor} dark:text-white`}>
              {title}
            </h3>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-[#333333] rounded-lg hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${styles.confirmButton}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;