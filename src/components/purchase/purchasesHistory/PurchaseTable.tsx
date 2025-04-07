import { useState } from 'react';
import BasicTable from '../../Utils/BasicTable';
import { PurchaseHead } from '@/data/tableHeadData';
import NoDataMessage from '../../Utils/NoDataMessage';
import { TableCell, TableRow } from '@mui/material';
import { PurchaseDetails } from '@/types/index';

type PurchaseTableProps = {
    data: PurchaseDetails;
};
export default function PurchaseTable({ data }: PurchaseTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    return (
        <>
            <BasicTable
                rows={data}
                listHead={PurchaseHead}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
            >
                {/* validata if data */}
                {data.length === 0 && (
                    <NoDataMessage msg="compras" cols={PurchaseHead.length} />
                )}

                {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
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
                            <TableCell align="center">
                                <img
                                    src={
                                        row.storedProducts.detailsProducts.image
                                            ? row.storedProducts.detailsProducts
                                                  .image
                                            : '/img/no-image.jpg'
                                    }
                                    alt="image"
                                    className="h-10 w-fit rounded-full mx-auto"
                                />
                            </TableCell>
                            <TableCell align="center">
                                {
                                    row.storedProducts.detailsProducts.products
                                        .code
                                }
                            </TableCell>

                            <TableCell align="center">
                                {
                                    row.storedProducts.detailsProducts.products
                                        .name
                                }
                            </TableCell>

                            <TableCell align="center">
                                {row.purchasePrice}
                            </TableCell>
                            <TableCell align="center">
                                {row.salePrice}
                            </TableCell>
                            <TableCell align="center">{row.amount}</TableCell>
                            <TableCell align="center">{row.discount}</TableCell>
                            <TableCell align="center">{row.subtotal}</TableCell>
                        </TableRow>
                    ))}
            </BasicTable>
        </>
    );
}
