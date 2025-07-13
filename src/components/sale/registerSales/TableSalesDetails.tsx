import { useState } from 'react';
import { Delete } from '@mui/icons-material';
import BasicTable from '@/components/Utils/BasicTable';
import { listSaleHeaders } from '@/data/tableHeadData';
import { TableCell, TableRow } from '@mui/material';
import { RegisterSaleDetailsTransaction } from '@/types/zustandTypes';
import { useAppStore } from '@/store/useAppStore';
import TableBodyCellSales from './TableBodyCellSales';

type TableSalesDetailsProps = {
    data: RegisterSaleDetailsTransaction[];
};

export default function TableSalesDetails({ data }: TableSalesDetailsProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const removeProductFromSale = useAppStore(
        (store) => store.removeProductFromSale,
    );

    const handleDeleteProductFromSale = (id: number) => {
        removeProductFromSale(id);
    };

    return (
        <>
            <BasicTable
                rows={data}
                listHead={listSaleHeaders}
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
                            <TableBodyCellSales
                                storedProductsId={row.storedProductsId}
                                row={row}
                            />

                            <TableCell align="center" className="space-x-1 ">
                                <Delete
                                    className="text-red-800 hover:text-red-700 cursor-pointer"
                                    onClick={() =>
                                        handleDeleteProductFromSale(
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
