import {
    RegisterSaleDetailsTransaction,
    RegisterSaleForm,
} from '@/types/zustandTypes';
import { TableCell } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import ToolTipComponent from '@/components/Utils/ToolTipComponent';
import TransactionControlledInput from '@/components/Utils/TransactionControlledInput';
import useSaleDetail from '@/hooks/sale/useSaleDetail';

type TableBodyCellSalesProps = {
    storedProductsId: number;
    row: RegisterSaleDetailsTransaction;
};

export default function TableBodyCellSales({
    storedProductsId,
    row,
}: TableBodyCellSalesProps) {
    const { control } = useFormContext<RegisterSaleForm>();

    const { handleDetailChange } = useSaleDetail({ row });

    return (
        <>
            <TableCell align="center">
                {' '}
                <img
                    src={row.image ? row.image : '/img/no-image.jpg'}
                    alt="image"
                    className="h-10 w-fit rounded-full mx-auto"
                />
            </TableCell>

            <TableCell align="center" className="capitalize">
                <input
                    type="text"
                    value={row.code}
                    readOnly
                    className="input-read-only"
                />
            </TableCell>

            <TableCell align="center" className="capitalize ">
                <input
                    type="text"
                    value={row.name}
                    readOnly
                    className="input-read-only"
                />
            </TableCell>

            <TableCell align="center">
                <input
                    type="text"
                    value={row.price}
                    readOnly
                    className="input-read-only"
                />
            </TableCell>

            <TableCell align="center">
                <Controller
                    name={`detailsSales.${storedProductsId}.amount`}
                    control={control}
                    defaultValue={row.amount}
                    rules={{
                        required: 'La cantidad es obligatoria',
                        validate: (value) =>
                            +value >= 1 ||
                            'La cantidad debe ser mayor o igual a 1',
                    }}
                    render={({ field, fieldState }) => (
                        <ToolTipComponent
                            msg={fieldState.error?.message}
                            isError={!!fieldState.error}
                        >
                            <input
                                type="number"
                                min={1}
                                className={`input w-full pr-6 ${
                                    fieldState.error
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                                value={field.value}
                                onChange={(e) => {
                                    const value = +e.target.value;
                                    field.onChange(value);
                                    handleDetailChange('amount', value);
                                }}
                            />
                        </ToolTipComponent>
                    )}
                />
            </TableCell>

            <TableCell align="center">
                <TransactionControlledInput<RegisterSaleForm>
                    name={`detailsSales.${storedProductsId}.discount`}
                    control={control}
                    defaultValue={row.discount}
                    rules={{
                        required: 'El descuento es obligatorio',
                        validate: (value) =>
                            (+value >= 0 && +value <= 100) ||
                            'Debe estar entre 0% y 100%',
                    }}
                    min={0}
                    max={100}
                    onValueChange={(value) =>
                        handleDetailChange('discount', value)
                    }
                />
            </TableCell>

            <TableCell>
                <input
                    type="text"
                    value={row.subtotal}
                    readOnly
                    className="input-read-only"
                />
            </TableCell>
        </>
    );
}
