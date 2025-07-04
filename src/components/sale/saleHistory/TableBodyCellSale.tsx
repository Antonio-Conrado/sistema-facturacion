import { SaleHistoryTable } from '@/types/index';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { TableCell } from '@mui/material';

export default function TableBodyCellSales({ row }: { row: SaleHistoryTable }) {
    return (
        <>
            <TableCell align="center">{row.invoiceNumber}</TableCell>
            <TableCell align="center">
                {row.users.name} {row.users.surname}
            </TableCell>
            <TableCell align="center">{row.paymentMethods.name}</TableCell>
            <TableCell align="center">{formatDate(row.date)}</TableCell>
            <TableCell align="center">{row.discount}%</TableCell>
            <TableCell align="center">{row.iva}%</TableCell>
            <TableCell align="center">{formatCurrency(row.total)}</TableCell>
            <TableCell align="center">
                {row.status ? (
                    <p className="bg-green-700 text-white p-2 rounded-md">
                        Completado
                    </p>
                ) : (
                    <p className="bg-red-700 text-white p-2 rounded-md">
                        Anulado
                    </p>
                )}
            </TableCell>
        </>
    );
}
