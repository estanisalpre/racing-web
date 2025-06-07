import React, { useEffect } from 'react';
import { X, Laugh, CircleAlert, Info } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationModalProps {
  isOpen: boolean;
  type: NotificationType;
  title: string;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  type,
  title,
  message,
  onClose,
  autoClose = true,
  autoCloseDelay = 3000
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#8dff71';
      case 'error':
        return '#ff7171';
      case 'warning':
        return '#ff9e42';
      case 'info':
        return '#4298ff';
      default:
        return '#dddddd';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Laugh size={35}/>;
      case 'error':
        return '';
      case 'warning':
        return <CircleAlert size={35}/>;
      case 'info':
        return <Info size={35}/>;
      default:
        return '';
    }
  };

  return (
    <div className="alert-container">
      <div
        className='alert-content'
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <div className="alert-title">
          <div className="alert-icon-text">
            <span>{getIcon()}</span>
            <div className='alert-text'>
              <h3>{title}</h3>
              <p>{message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="alert-close-btn"
          >
            <X className='alert-close-icon' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;