import { NotificationContext } from '@/context/NotificationContext';
import { useContext } from 'react';

export default function useToast() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useToast debe ser usado dentro de un NotificationProvider.");
  }
  const toast = {
    success: (message: string) => {
      context.showToast(message, 'success');
    },
    error: (message: string) => {
      context.showToast(message, 'error');
    },
  };

  return toast;
}
