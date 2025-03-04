import { Category } from '@/types/index';
import { TableCell } from '@mui/material';

export default function TableBodyCellCategory({ row }: { row: Category }) {
    return (
        <>
            <TableCell align="center">{row.id}</TableCell>
            <TableCell align="center" className="capitalize">
                {row.name}
            </TableCell>
            <TableCell align="center">{row.description}</TableCell>
            <TableCell align="center">
                {row.status ? (
                    <p className="bg-green-700 text-white p-2 rounded-md">
                        Disponible
                    </p>
                ) : (
                    <p className="bg-red-700 text-white p-2 rounded-md">
                        No Disponible
                    </p>
                )}
            </TableCell>
        </>
    );
}
