import Modal from '@mui/material/Modal';
import { ReactNode } from 'react';
import { Box } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '30%',
    bgcolor: 'background.paper',
    border: '1px solid #929292',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
};

type BasicModalProps = {
    openModal: boolean;
    onClose: () => void;
    children: ReactNode;
};
export default function BasicModal({
    openModal,
    onClose,
    children,
}: BasicModalProps) {
    return (
        <Modal
            keepMounted
            open={openModal}
            onClose={onClose}
            disableAutoFocus
            disableEnforceFocus
        >
            <Box sx={style}>{children}</Box>
        </Modal>
    );
}
