import useToast from '@/hooks/useNotifications';
import {
    PurchaseHistoryTable,
    PurchasesHistory,
    SearchFilterValues,
} from '@/types/index';
import { useEffect, useState } from 'react';
import BasicTable from '../../Utils/BasicTable';
import { listPurchasesHistoryHead } from '@/data/tableHeadData';
import NoDataMessage from '../../Utils/NoDataMessage';
import { TableCell, TableRow } from '@mui/material';
import TableBodyCellPurchases from './TableBodyCellPurchase';
import { Block, Description, Info, NoteAdd } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { ModalAction, Role } from '@/data/index';
import BasicModal from '../../Utils/BasicModal';
import SuspendPurchase from './SuspendPurchase';
import { Link, useLocation } from 'react-router-dom';
import InputFileUpload from '@/components/Utils/InputFileUpload';
import {
    filterPurchaseByTermAPI,
    getPurchasesApi,
    uploadPurchaseInvoiceAPI,
} from '@/api/purchase/purchase';
import useAuth from '@/hooks/useAuth';
import { getUser } from '@/api/user/user';

type PurchasesDataProps = {
    data: PurchasesHistory['purchases'];
    total: PurchasesHistory['total'];
    isFiltered: boolean;
    filteredPurchasesByTerm: Partial<SearchFilterValues>;
};
export default function PurchasesData({
    data,
    total,
    isFiltered,
    filteredPurchasesByTerm,
}: PurchasesDataProps) {
    const location = useLocation();
    const { userAuth } = useAuth();
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser({ id: userAuth.id }),
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [purchase, setPurchase] = useState<PurchaseHistoryTable>();
    const [tableData, setTableData] =
        useState<PurchasesHistory['purchases']>(data);

    const toast = useToast();
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleOpenModal = (action: ModalAction, id: number) => {
        setOpenModal(true);
        setModalContent(action);
        const purchase = data.find((purchase) => purchase.id === id);
        if (!purchase) {
            toast.error(
                'Hubo un error! Intenta nuevamente o actualiza la página',
            );
            setOpenModal(false);
            return;
        }
        setPurchase(purchase);
    };

    const paginationData = useQuery({
        queryKey: isFiltered
            ? ['purchaseFilters', rowsPerPage, page, filteredPurchasesByTerm]
            : ['purchases', rowsPerPage, page],
        queryFn: () => {
            const take = rowsPerPage;
            const skip = page * rowsPerPage;
            return isFiltered
                ? filterPurchaseByTermAPI({
                      term: filteredPurchasesByTerm,
                      take,
                      skip,
                  })
                : getPurchasesApi({
                      take,
                      skip,
                  });
        },
    });

    useEffect(() => {
        if (paginationData.data?.purchases) {
            setTableData(paginationData.data.purchases);
        }
    }, [paginationData.data, page, rowsPerPage]);

    useEffect(() => {
        if (isFiltered) {
            setPage(0);
        }
    }, [isFiltered]);

    return (
        <>
            <BasicTable
                rows={tableData}
                listHead={listPurchasesHistoryHead}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
                total={total}
            >
                {/* validata if data */}
                {tableData.length === 0 && (
                    <NoDataMessage
                        msg="compras"
                        cols={listPurchasesHistoryHead.length}
                    />
                )}

                {tableData.map((row) => (
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
                        <TableBodyCellPurchases row={row} />
                        <TableCell align="center" className="space-x-1 ">
                            <Link to={`${location.pathname}/${row.id}`}>
                                {' '}
                                <Info className="text-cyan-800  hover:text-cyan-700 cursor-pointer" />
                            </Link>

                            <NoteAdd
                                className="text-amber-800 hover:text-amber-700 cursor-pointer"
                                onClick={() =>
                                    handleOpenModal(ModalAction.Add, row.id)
                                }
                            />

                            {row.document && (
                                <>
                                    <Link
                                        to={row.document}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Description className="text-teal-800 hover:text-teal-700 cursor-pointer" />
                                    </Link>
                                </>
                            )}

                            {user?.roles?.name === Role.admin && row.status && (
                                <Block
                                    className="text-red-800 hover:text-red-700 cursor-pointer"
                                    onClick={() =>
                                        handleOpenModal(
                                            ModalAction.Suspend,
                                            row.id,
                                        )
                                    }
                                />
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </BasicTable>

            {/* Open a modal when a security action has been executed */}
            <BasicModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
            >
                {modalContent === ModalAction.Add && purchase && (
                    <div className="flex justify-center w-72 mx-auto">
                        <InputFileUpload
                            text="Subir factura"
                            infoCache="purchases"
                            mutationFn={uploadPurchaseInvoiceAPI}
                            id={purchase.id}
                        />
                    </div>
                )}
                {modalContent === ModalAction.Suspend && purchase && (
                    <SuspendPurchase
                        purchase={purchase}
                        onClose={() => setOpenModal(false)}
                    />
                )}
            </BasicModal>
        </>
    );
}
