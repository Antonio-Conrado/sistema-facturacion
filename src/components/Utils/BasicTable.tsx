import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import BasicTableHead from './BasicTableHead';
import { Dispatch, SetStateAction } from 'react';

type BasicTableProps<T> = {
    rows: T[];
    listHead: string[];
    page: number;
    rowsPerPage: number;
    total?: number;
    setPage: Dispatch<SetStateAction<number>>;
    setRowsPerPage: Dispatch<SetStateAction<number>>;
    children: React.ReactNode;
};
export default function BasicTable<T>({
    rows,
    listHead,
    page,
    rowsPerPage,
    total,
    setPage,
    setRowsPerPage,
    children,
}: BasicTableProps<T>) {
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 500 }}
                    aria-label="custom pagination table"
                >
                    <BasicTableHead list={listHead} />
                    <TableBody>
                        <>{children}</>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total ? total : rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filas por página"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}–${to} de ${count}`
                }
            />
        </Paper>
    );
}
