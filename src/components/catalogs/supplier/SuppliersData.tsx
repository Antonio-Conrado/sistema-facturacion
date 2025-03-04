import BasicTable from '@/components/Utils/BasicTable';
import NoDataMessage from '@/components/Utils/NoDataMessage';
import { listSuppliersHead } from '@/data/tableHeadData';
import useToast from '@/hooks/useNotifications';
import { Supplier, Suppliers } from '@/types/index';
import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { Block, Edit } from '@mui/icons-material';
import BasicModal from '@/components/Utils/BasicModal';
import { ModalAction } from '@/data/index';
import SupplierForm from './SupplierForm';
import SuspendSupplier from './SuspendSupplier';
import TableBodyCellSupplier from './TableBodyCellSupplier';

export default function SuppliersData({ data }: { data: Suppliers }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [supplier, setSupplier] = useState<Supplier>();

    const toast = useToast();
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleOpenModal = (action: ModalAction, id: number) => {
        setOpenModal(true);
        setModalContent(action);
        const supplier = data.find((supplier) => supplier.id === id);
        if (!supplier) {
            toast.error(
                'Hubo un error! Intenta nuevamente o actualiza la página',
            );
            setOpenModal(false);
            return;
        }
        setSupplier(supplier);
    };
    return (
        <>
            <BasicTable
                rows={data}
                listHead={listSuppliersHead}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
            >
                {/* validata if data */}
                {data.length === 0 && (
                    <NoDataMessage
                        msg="proveedores"
                        cols={listSuppliersHead.length}
                    />
                )}

                {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                        >
                            <TableBodyCellSupplier row={row} />

                            <TableCell align="center" className="space-x-1 ">
                                <Edit
                                    className="text-cyan-800  hover:text-cyan-700 cursor-pointer"
                                    onClick={() =>
                                        handleOpenModal(
                                            ModalAction.Edit,
                                            row.id,
                                        )
                                    }
                                />
                                <Block
                                    className="text-red-800 hover:text-red-700 cursor-pointer"
                                    onClick={() =>
                                        handleOpenModal(
                                            ModalAction.Suspend,
                                            row.id,
                                        )
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    ))}
            </BasicTable>
            {/* Open a modal when a security action has been executed */}
            <BasicModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
            >
                {modalContent === ModalAction.Edit && supplier && (
                    <SupplierForm
                        supplier={supplier}
                        onClose={() => setOpenModal(false)}
                        action={ModalAction.Edit}
                    />
                )}

                {modalContent === ModalAction.Suspend && supplier && (
                    <SuspendSupplier
                        supplier={supplier}
                        onClose={() => setOpenModal(false)}
                    />
                )}
            </BasicModal>
        </>
    );
}
