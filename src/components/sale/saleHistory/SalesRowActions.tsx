import { Tooltip } from '@mui/material';
import {
    AccountBalance,
    Block,
    Description,
    Info,
    NoteAdd,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ModalAction, PaymentMethodsLabel, Role } from '@/data/index';
import { SaleHistoryTable, User } from '@/types/index';
import { useAppStore } from '@/store/useAppStore';

type SalesRowActions = {
    row: SaleHistoryTable;
    user: User;
    handleOpenModal: (action: ModalAction, id: number) => void;
};

export default function SalesRowActions({
    row,
    user,
    handleOpenModal,
}: SalesRowActions) {
    const addedFromModal = useAppStore((store) => store.addedFromModal);
    const saveFinalizedSaleId = useAppStore(
        (store) => store.saveFinalizedSaleId,
    );
    const handleOpenInvoice = () => {
        saveFinalizedSaleId(row.id);
        addedFromModal(true, 'saleInvoice');
    };
    return (
        <>
            <Tooltip
                title={`Ver información detallada de la venta ${row.invoiceNumber}`}
            >
                <Link to={`${location.pathname}/${row.id}`}>
                    {' '}
                    <Info className="text-cyan-800  hover:text-cyan-700 cursor-pointer" />
                </Link>
            </Tooltip>

            <Tooltip
                title={`Imprimir factura de la venta ${row.invoiceNumber}`}
            >
                <Description
                    className="text-teal-800 hover:text-teal-700 cursor-pointer"
                    onClick={handleOpenInvoice}
                />
            </Tooltip>

            {row.paymentMethods.name === PaymentMethodsLabel.bankTransfer && (
                <Tooltip title="Agregar referencia de transferencia bancaria">
                    <NoteAdd
                        className="text-amber-800 hover:text-amber-700 cursor-pointer"
                        onClick={() => handleOpenModal(ModalAction.Add, row.id)}
                    />
                </Tooltip>
            )}

            {row.document && (
                <>
                    <Tooltip title="Ver referencia de transferencia bancaria">
                        <Link
                            to={row.document}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <AccountBalance className="text-teal-800 hover:text-teal-700 cursor-pointer" />
                        </Link>
                    </Tooltip>
                </>
            )}

            {user?.roles?.name === Role.admin && row.status && (
                <Tooltip title="Anular venta">
                    <Block
                        className="text-red-800 hover:text-red-700 cursor-pointer"
                        onClick={() =>
                            handleOpenModal(ModalAction.Suspend, row.id)
                        }
                    />
                </Tooltip>
            )}
        </>
    );
}
