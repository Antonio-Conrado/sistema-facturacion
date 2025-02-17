import { Supplier } from '@/types/index';
import { TableCell } from '@mui/material';

export default function TableBodyCellSupplier({ row }: { row: Supplier }) {
    return (
        <>
            <TableCell align="center">{row.id}</TableCell>
            <TableCell align="center" className="capitalize">
                {row.ruc}
            </TableCell>
            <TableCell align="center" className="capitalize">
                {row.name}
            </TableCell>
            <TableCell align="center">{row.direction}</TableCell>
            <TableCell align="center">{row.telephone}</TableCell>
            <TableCell align="center">{row.email}</TableCell>
            <TableCell align="center">
                {row.status ? (
                    <span className="bg-green-700 text-white p-2 rounded-md">
                        Disponible
                    </span>
                ) : (
                    <span className="bg-red-700 text-white p-2 rounded-md">
                        No Disponible
                    </span>
                )}
            </TableCell>
        </>
    );
}
