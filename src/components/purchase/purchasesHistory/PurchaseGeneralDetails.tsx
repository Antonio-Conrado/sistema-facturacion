import { uploadPurchaseInvoiceAPI } from '@/api/purchase/purchase';
import BasicModal from '@/components/Utils/BasicModal';
import InputFileUpload from '@/components/Utils/InputFileUpload';
import ReadOnlyInput from '@/components/Utils/ReadOnlyInput';
import { ModalAction } from '@/data/index';
import { Purchase } from '@/types/index';
import { Description, NoteAdd } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PurchaseGeneralDetails({
    purchase,
}: {
    purchase: Purchase;
}) {
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleOpenModal = (action: ModalAction) => {
        setOpenModal(true);
        setModalContent(action);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReadOnlyInput
                title="Usuario"
                name="user"
                value={purchase.users.name}
                dataType="text"
            />

            <ReadOnlyInput
                title="Proveedor"
                name="supplier"
                value={purchase.suppliers.name}
                dataType="text"
            />

            <ReadOnlyInput
                title="Fecha"
                name="date"
                value={purchase.date}
                dataType="date"
            />

            <ReadOnlyInput
                title="Estado"
                name="supplier"
                value={purchase.status}
                dataType="status"
                statusText={purchase.status ? 'Completado' : 'Anulado'}
            />

            {/* Show document if it exists, otherwise allow uploading a new document */}

            {purchase.document ? (
                <>
                    <Link
                        to={purchase.document}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Description
                            className="text-teal-800 hover:text-teal-700 cursor-pointer"
                            style={{ fontSize: '40px' }}
                        />
                    </Link>
                </>
            ) : (
                <>
                    <NoteAdd
                        className="text-amber-800 hover:text-amber-700 cursor-pointer"
                        style={{ fontSize: '40px' }}
                        onClick={() => handleOpenModal(ModalAction.Add)}
                    />

                    <BasicModal
                        openModal={openModal}
                        onClose={() => setOpenModal(false)}
                    >
                        {modalContent === ModalAction.Add && (
                            <div className="flex justify-center w-72 mx-auto">
                                <InputFileUpload
                                    text="Subir factura"
                                    infoCache="purchase"
                                    mutationFn={uploadPurchaseInvoiceAPI}
                                    id={purchase.id}
                                />
                            </div>
                        )}
                    </BasicModal>
                </>
            )}
        </div>
    );
}
