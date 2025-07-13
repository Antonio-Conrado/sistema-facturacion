import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useAppStore } from '@/store/useAppStore';
import { Close } from '@mui/icons-material';
import InvoiceDownload from '../invoice/InvoiceDownload';
import { ModalKeyList } from '@/types/zustandTypes';

type InvoiceModalProps = {
    id: number;
    title: string;
    modalType: ModalKeyList;
};

export default function InvoiceModal({
    id,
    title,
    modalType,
}: InvoiceModalProps) {
    const isActiveModal = useAppStore((store) => store.isActiveModal);
    const activeModalKey = useAppStore((store) => store.activeModalKey);
    const addedFromModal = useAppStore((store) => store.addedFromModal);
    return (
        <>
            {isActiveModal && activeModalKey === modalType && (
                <Dialog open={isActiveModal} fullWidth maxWidth="sm">
                    <div className="relative flex items-center justify-center w-full border-b-2 pb-2">
                        <DialogTitle className="text-2xl text-center w-4/5">
                            {title}
                        </DialogTitle>
                        <Close
                            className="absolute right-4 top-2 text-slate-700 border-orange-800 cursor-pointer"
                            onClick={() => addedFromModal(false, modalType)}
                        />
                    </div>
                    <DialogContent className="flex justify-around my-5">
                        <InvoiceDownload id={id} />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
