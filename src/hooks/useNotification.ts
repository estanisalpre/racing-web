import { useState, useCallback } from 'react';
import type { NotificationType } from '@/lib/components/NotificationModal';

interface NotificationState {
  isOpen: boolean;
  type: NotificationType;
  title: string;
  message: string;
}

const initialState: NotificationState = {
  isOpen: false,
  type: 'info',
  title: '',
  message: ''
};

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState>(initialState);

  const showNotification = useCallback((
    type: NotificationType,
    title: string,
    message: string
  ) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    });
  }, []);

  const showSuccess = useCallback((title: string, message: string) => {
    showNotification('success', title, message);
  }, [showNotification]);

  const showError = useCallback((title: string, message: string) => {
    showNotification('error', title, message);
  }, [showNotification]);

  const showWarning = useCallback((title: string, message: string) => {
    showNotification('warning', title, message);
  }, [showNotification]);

  const showInfo = useCallback((title: string, message: string) => {
    showNotification('info', title, message);
  }, [showNotification]);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    notification,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideNotification
  };
};