import { TableCell, TableRow } from '@mui/material';

export default function NoDataMessage({
    msg,
    cols,
}: {
    msg: string;
    cols: number;
}) {
    return (
        <TableRow>
            <TableCell align="center" colSpan={cols}>
                No hay información disponible. Empieza registrando {msg}
            </TableCell>
        </TableRow>
    );
}
