import { StoredProduct } from '@/types/index';
import { TableCell } from '@mui/material';

export default function TableBodyCellProduct({ row }: { row: StoredProduct }) {
    return (
        <>
            <TableCell align="center">{row.id}</TableCell>
            <TableCell align="center">
                <img
                    src={
                        row.detailsProducts.image
                            ? row.detailsProducts.image
                            : '/img/no-image.jpg'
                    }
                    alt="image"
                    className="h-10 w-fit rounded-full mx-auto"
                />
            </TableCell>
            <TableCell align="center">
                {row.detailsProducts.products.code}
            </TableCell>
            <TableCell align="center">
                {row.detailsProducts.products.name}
            </TableCell>
            <TableCell align="center">
                {row.detailsProducts?.products?.categories?.name}
            </TableCell>
            <TableCell align="center">{row.stock}</TableCell>
            <TableCell align="center">{row.salePrice}</TableCell>
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
