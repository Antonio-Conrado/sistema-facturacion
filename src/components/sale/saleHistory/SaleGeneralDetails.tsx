import { uploadSaleInvoiceAPI } from '@/api/sale/sale';
import BasicModal from '@/components/Utils/BasicModal';
import InputFileUpload from '@/components/Utils/InputFileUpload';
import ReadOnlyInput from '@/components/Utils/ReadOnlyInput';
import { ModalAction, PaymentMethodsLabel } from '@/data/index';
import { useAppStore } from '@/store/useAppStore';
import { Sale } from '@/types/index';
import { formatDate } from '@/utils/formatDate';
import { AccountBalance, Description, NoteAdd } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type SaleGeneralDetailsProps = {
    sale: Sale;
};

export default function SaleGeneralDetails({ sale }: SaleGeneralDetailsProps) {
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleOpenModal = (action: ModalAction) => {
        setOpenModal(true);
        setModalContent(action);
    };

    const addedFromModal = useAppStore((store) => store.addedFromModal);
    const saveFinalizedSaleId = useAppStore(
        (store) => store.saveFinalizedSaleId,
    );
    const handleOpenInvoice = () => {
        saveFinalizedSaleId(sale.id);
        addedFromModal(true, 'saleInvoice');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReadOnlyInput
                title="Usuario"
                name="user"
                value={sale.users.name}
                dataType="text"
            />

            <ReadOnlyInput
                title="Método de pago"
                name="supplier"
                value={sale.paymentMethods.name}
                dataType="text"
            />

            <ReadOnlyInput
                title="Fecha"
                name="date"
                value={sale.date}
                dataType="date"
            />

            <ReadOnlyInput
                title="Estado"
                name="supplier"
                value={sale.status}
                dataType="status"
                statusText={sale.status ? 'Completado' : 'Anulado'}
            />

            {sale.status === false && (
                <>
                    <ReadOnlyInput
                        title="Razón de cancelación"
                        name="cancellationReason"
                        value={sale.cancellationReason}
                        dataType="text"
                    />

                    {sale.annulledAt && (
                        <ReadOnlyInput
                            title="Fecha de cancelación"
                            name="annulledAt"
                            value={formatDate(sale.annulledAt)}
                            dataType="text"
                        />
                    )}
                </>
            )}

            <div className="flex gap-5">
                {sale.paymentMethods.name ===
                    PaymentMethodsLabel.bankTransfer && (
                    <>
                        {sale.document ? (
                            <>
                                <Tooltip title="Ver referencia de transferencia bancaria">
                                    <Link
                                        to={sale.document}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AccountBalance
                                            className="text-teal-800 hover:text-teal-700 cursor-pointer"
                                            style={{ fontSize: '40px' }}
                                        />
                                    </Link>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <Tooltip title="Agregar referencia de transferencia bancaria">
                                    <NoteAdd
                                        className="text-amber-800 hover:text-amber-700 cursor-pointer"
                                        style={{ fontSize: '40px' }}
                                        onClick={() =>
                                            handleOpenModal(ModalAction.Add)
                                        }
                                    />
                                </Tooltip>

                                <BasicModal
                                    openModal={openModal}
                                    onClose={() => setOpenModal(false)}
                                >
                                    {modalContent === ModalAction.Add && (
                                        <div className="flex justify-center w-72 mx-auto">
                                            <InputFileUpload
                                                text="Subir comprobante de transferencia"
                                                infoCache="sale"
                                                mutationFn={
                                                    uploadSaleInvoiceAPI
                                                }
                                                id={sale.id}
                                                width="w-full"
                                            />
                                        </div>
                                    )}
                                </BasicModal>
                            </>
                        )}
                    </>
                )}

                <Tooltip
                    title={`Imprimir factura de la venta ${sale.invoiceNumber}`}
                >
                    <Description
                        className="text-teal-800 hover:text-teal-700 cursor-pointer"
                        style={{ fontSize: '40px' }}
                        onClick={handleOpenInvoice}
                    />
                </Tooltip>
            </div>
        </div>
    );
}
