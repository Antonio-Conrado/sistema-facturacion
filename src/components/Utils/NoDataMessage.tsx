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
                No hay resultados para mostrar. Es posible que aún no se hayan
                registrado datos de {msg}, o que los filtros aplicados no
                coincidan con ningún registro.
            </TableCell>
        </TableRow>
    );
}
