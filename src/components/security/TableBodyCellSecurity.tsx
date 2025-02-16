import { User } from '@/types/index';
import { TableCell } from '@mui/material';

export default function TableBodyCellSecurity({ row }: { row: User }) {
    return (
        <>
            <TableCell align="center">{row.id}</TableCell>
            <TableCell align="center">
                <img
                    src={row.image ? row.image : '/img/no-image.jpg'}
                    alt="image"
                    className="h-10 w-fit rounded-full mx-auto"
                />
            </TableCell>

            <TableCell align="center" className="capitalize">
                {row.name} {''} {row.surname}
            </TableCell>
            <TableCell align="center">{row.roles?.name}</TableCell>
            <TableCell align="center">{row.email}</TableCell>
            <TableCell align="center">{row.telephone}</TableCell>
            <TableCell align="center">
                {row.status ? (
                    <span className="bg-green-700 text-white p-2 rounded-md">
                        Disponible
                    </span>
                ) : (
                    <span className="bg-red-700 text-white p-2 rounded-md">
                        Suspendido
                    </span>
                )}
            </TableCell>
        </>
    );
}
