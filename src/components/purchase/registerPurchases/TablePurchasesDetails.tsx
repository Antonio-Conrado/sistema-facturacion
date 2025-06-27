import { useState } from 'react';
import BasicTable from '@/components/Utils/BasicTable';
import { listPurchaseHeaders } from '@/data/tableHeadData';
import { TableCell, TableRow } from '@mui/material';
import { RegisterDetailsTransaction } from '@/types/zustandTypes';
import { Delete } from '@mui/icons-material';
import { useAppStore } from '@/store/useAppStore';
import TableBodyCellPurchases from './TableBodyCellPurchases';

type TablePurchasesDetailsProps = {
    data: RegisterDetailsTransaction[];
};

export default function TablePurchasesDetails({
    data,
}: TablePurchasesDetailsProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const removeProductFromPurchase = useAppStore(
        (store) => store.removeProductFromPurchase,
    );

    const handleDeleteProductFromPurchase = (id: number) => {
        removeProductFromPurchase(id);
    };

    return (
        <>
            <BasicTable
                rows={data}
                listHead={listPurchaseHeaders}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
                disablePagination={true}
            >
                {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                        <TableRow
                            key={row.storedProductsId}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                        >
                            <TableBodyCellPurchases
                                storedProductsId={row.storedProductsId}
                                row={row}
                            />

                            <TableCell align="center" className="space-x-1 ">
                                <Delete
                                    className="text-red-800 hover:text-red-700 cursor-pointer"
                                    onClick={() =>
                                        handleDeleteProductFromPurchase(
                                            row.storedProductsId,
                                        )
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    ))}
            </BasicTable>
        </>
    );
}
