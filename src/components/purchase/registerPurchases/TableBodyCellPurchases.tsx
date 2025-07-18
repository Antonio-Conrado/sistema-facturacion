import {
    RegisterDetailsTransaction,
    RegisterPurchaseForm,
} from '@/types/zustandTypes';
import { TableCell } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import ToolTipComponent from '@/components/Utils/ToolTipComponent';
import usePurchaseDetail from '@/hooks/purchase/usePurchaseDetail';
import { useEffect } from 'react';
import TransactionControlledInput from '@/components/Utils/TransactionControlledInput';

type TableBodyCellPurchasesProps = {
    storedProductsId: number;
    row: RegisterDetailsTransaction;
};

export default function TableBodyCellPurchases({
    storedProductsId,
    row,
}: TableBodyCellPurchasesProps) {
    const { trigger, watch, control } = useFormContext<RegisterPurchaseForm>();

    const { handleDetailChange } = usePurchaseDetail({ row });

    const purchasePrice = watch(
        `detailsPurchases.${storedProductsId}.purchasePrice`,
    );
    useEffect(() => {
        trigger(`detailsPurchases.${storedProductsId}.salePrice`);
        trigger(`detailsPurchases.${storedProductsId}.purchasePrice`);
    }, [purchasePrice, storedProductsId, trigger]);

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
                <Controller
                    name={`detailsPurchases.${storedProductsId}.purchasePrice`}
                    control={control}
                    defaultValue={row.purchasePrice}
                    rules={{
                        required: 'El precio de compra es obligatorio',
                        validate: (value) =>
                            value > 0 ||
                            'El precio de compra debe ser mayor a 0',
                    }}
                    render={({ field, fieldState }) => (
                        <ToolTipComponent
                            msg={fieldState.error?.message}
                            isError={!!fieldState.error}
                        >
                            <input
                                type="number"
                                min={0}
                                className={`input w-full pr-6 ${
                                    fieldState.error
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                                value={field.value}
                                onChange={(e) => {
                                    const value = +e.target.value;
                                    field.onChange(value);
                                    handleDetailChange('purchasePrice', value);
                                }}
                            />
                        </ToolTipComponent>
                    )}
                />
            </TableCell>

            <TableCell align="center">
                <Controller
                    name={`detailsPurchases.${storedProductsId}.salePrice`}
                    control={control}
                    defaultValue={row.salePrice}
                    rules={{
                        required: 'El precio de venta es obligatorio',
                        validate: (value) => {
                            if (purchasePrice >= +value) {
                                return 'El precio de venta debe ser mayor al precio de compra';
                            }
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <ToolTipComponent
                            msg={fieldState.error?.message}
                            isError={!!fieldState.error}
                        >
                            <input
                                type="number"
                                min={0}
                                className={`input w-full pr-6 ${
                                    fieldState.error
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                                value={field.value}
                                onChange={(e) => {
                                    const value = +e.target.value;
                                    field.onChange(value);
                                    handleDetailChange('salePrice', value);
                                }}
                            />
                        </ToolTipComponent>
                    )}
                />
            </TableCell>

            <TableCell align="center">
                <Controller
                    name={`detailsPurchases.${storedProductsId}.amount`}
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
                <TransactionControlledInput<RegisterPurchaseForm>
                    name={`detailsPurchases.${storedProductsId}.discount`}
                    control={control}
                    defaultValue={row.discount}
                    rules={{
                        required: 'El descuento es obligatorio',
                        validate: (value) =>
                            (+value >= 0 && +value <= 50) ||
                            'Debe estar entre 0% y 50%',
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
