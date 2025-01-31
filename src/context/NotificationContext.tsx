import { createContext, useState, ReactNode } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type NotificationContextType = {
    showToast: (message: string, type: 'success' | 'error') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<'success' | 'error'>('success');

    const showToast = (message: string, type: 'success' | 'error') => {
        setMessage(message);
        setType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setMessage('');
    };

    return (
        <NotificationContext.Provider value={{ showToast }}>
            {children}
            <Snackbar
                open={open}
                message={message}
                onClose={handleClose}
                autoHideDuration={5000}  
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                key={'top' + 'right'} 
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
                className='w-fit'
                ContentProps={{
                    style: {
                        backgroundColor: type === 'success' ?  'rgb(22 163 74 / var(--tw-bg-opacity, 1))' : 'rgb(220 38 38 / var(--tw-bg-opacity, 1))',
                        left:'auto'
                    },
                }}
            />
        </NotificationContext.Provider>
    );
};

export {NotificationContext}
export default NotificationProvider