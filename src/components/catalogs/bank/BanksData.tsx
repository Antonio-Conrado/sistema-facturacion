import { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Block, Edit } from '@mui/icons-material';
import BasicTable from '@/components/Utils/BasicTable';
import NoDataMessage from '@/components/Utils/NoDataMessage';
import { listBankHead } from '@/data/tableHeadData';
import useToast from '@/hooks/useNotifications';
import { Bank, Banks } from '@/types/index';
import BasicModal from '@/components/Utils/BasicModal';
import { ModalAction } from '@/data/index';
import BankForm from './BankForm';
import SuspendBank from './SuspendBank';
import TableBodyCellBank from './TableBodyCellBank';

export default function BankData({ data }: { data: Banks }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [bank, setBank] = useState<Bank>();

    const toast = useToast();
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleOpenModal = (action: ModalAction, id: number) => {
        setOpenModal(true);
        setModalContent(action);
        const bank = data.find((bank) => bank.id === id);
        if (!bank) {
            toast.error(
                'Hubo un error! Intenta nuevamente o actualiza la página',
            );
            setOpenModal(false);
            return;
        }
        setBank(bank);
    };
    return (
        <>
            <BasicTable
                rows={data}
                listHead={listBankHead}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
            >
                {/* validata if data */}
                {data.length === 0 && (
                    <NoDataMessage msg="bancos" cols={listBankHead.length} />
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
                            <TableBodyCellBank row={row} />

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
                {modalContent === ModalAction.Edit && bank && (
                    <BankForm
                        bank={bank}
                        onClose={() => setOpenModal(false)}
                        action={ModalAction.Edit}
                    />
                )}

                {modalContent === ModalAction.Suspend && bank && (
                    <SuspendBank
                        bank={bank}
                        onClose={() => setOpenModal(false)}
                    />
                )}
            </BasicModal>
        </>
    );
}
