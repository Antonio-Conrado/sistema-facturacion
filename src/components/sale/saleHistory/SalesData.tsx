import useToast from '@/hooks/useNotifications';
import {
    SaleHistoryTable,
    SalesHistory,
    SearchFilterValues,
} from '@/types/index';
import { useEffect, useState } from 'react';
import BasicTable from '../../Utils/BasicTable';
import { listSalesHistoryHead } from '@/data/tableHeadData';
import NoDataMessage from '../../Utils/NoDataMessage';
import { TableCell, TableRow } from '@mui/material';
import { Block, Description, Info, NoteAdd } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { ModalAction, PaymentMethodsLabel, Role } from '@/data/index';
import BasicModal from '../../Utils/BasicModal';
import { Link, useLocation } from 'react-router-dom';
import InputFileUpload from '@/components/Utils/InputFileUpload';
import useAuth from '@/hooks/useAuth';
import { getUser } from '@/api/user/user';
import {
    filterSaleByTermAPI,
    getSalesApi,
    uploadSaleInvoiceAPI,
} from '@/api/sale/sale';
import TableBodyCellSales from './TableBodyCellSale';
import SuspendSale from './SuspendSale';

type SalesDataProps = {
    data: SalesHistory['sales'];
    total: SalesHistory['total'];
    isFiltered: boolean;
    filteredSalesByTerm: Partial<SearchFilterValues>;
};

export default function SalesData({
    data,
    total,
    isFiltered,
    filteredSalesByTerm,
}: SalesDataProps) {
    const location = useLocation();
    const { userAuth } = useAuth();
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser({ id: userAuth.id }),
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sale, setSale] = useState<SaleHistoryTable>();
    const [tableData, setTableData] = useState<SalesHistory['sales']>(data);

    const toast = useToast();
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleOpenModal = (action: ModalAction, id: number) => {
        setOpenModal(true);
        setModalContent(action);
        const sale = data.find((sale) => sale.id === id);
        if (!sale) {
            toast.error(
                'Hubo un error! Intenta nuevamente o actualiza la página',
            );
            setOpenModal(false);
            return;
        }
        setSale(sale);
    };

    const paginationData = useQuery({
        queryKey: isFiltered
            ? ['saleFilters', rowsPerPage, page, filteredSalesByTerm]
            : ['sales', rowsPerPage, page],
        queryFn: () => {
            const take = rowsPerPage;
            const skip = page * rowsPerPage;
            return isFiltered
                ? filterSaleByTermAPI({
                      term: filteredSalesByTerm,
                      take,
                      skip,
                  })
                : getSalesApi({
                      take,
                      skip,
                  });
        },
    });

    useEffect(() => {
        if (paginationData.data?.sales) {
            setTableData(paginationData.data.sales);
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
                listHead={listSalesHistoryHead}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
                total={total}
            >
                {/* validata if data */}
                {tableData.length === 0 && (
                    <NoDataMessage
                        msg="ventas"
                        cols={listSalesHistoryHead.length}
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
                        <TableBodyCellSales row={row} />
                        <TableCell align="center" className="space-x-1 ">
                            <Link to={`${location.pathname}/${row.id}`}>
                                {' '}
                                <Info className="text-cyan-800  hover:text-cyan-700 cursor-pointer" />
                            </Link>

                            {row.paymentMethods.name ===
                                PaymentMethodsLabel.bankTransfer && (
                                <NoteAdd
                                    className="text-amber-800 hover:text-amber-700 cursor-pointer"
                                    onClick={() =>
                                        handleOpenModal(ModalAction.Add, row.id)
                                    }
                                />
                            )}

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
                {modalContent === ModalAction.Add && sale && (
                    <div className="flex justify-center w-full mx-auto">
                        <InputFileUpload
                            text="Subir comprobante de transferencia"
                            infoCache="sales"
                            mutationFn={uploadSaleInvoiceAPI}
                            id={sale.id}
                            width="w-full"
                        />
                    </div>
                )}
                {modalContent === ModalAction.Suspend && sale && (
                    <SuspendSale
                        sale={sale}
                        onClose={() => setOpenModal(false)}
                    />
                )}
            </BasicModal>
        </>
    );
}
