import { Dispatch } from 'react';
import { SearchFilterValues } from '@/types/index';
import AutoCompleteSearch from '../Utils/AutoCompleteSearch';
import { ivaList } from '../../data/index';
import { useAppStore } from '@/store/useAppStore';
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
} from 'react-hook-form';

type SelectIvaProps<T extends FieldValues> = {
    filters: Partial<SearchFilterValues>;
    transactionType: 'PURCHASES' | 'SALES';
    setFilters: Dispatch<React.SetStateAction<Partial<SearchFilterValues>>>;

    errors: FieldErrors<T>;
    control: Control<T, unknown, T>;
};

export default function SelectIva<T extends FieldValues>({
    filters,
    transactionType,
    setFilters,
    errors,
    control,
}: SelectIvaProps<T>) {
    const purchase = useAppStore((store) => store.purchase);
    const addPurchase = useAppStore((store) => store.addPurchase);
    const sale = useAppStore((store) => store.sale);
    const addSale = useAppStore((store) => store.addSale);

    const handleIvaChange = (ivaId: number | null) => {
        setFilters((prev) => ({
            ...prev,
            ivaId: ivaId ?? null,
        }));
        if (transactionType === 'PURCHASES') {
            addPurchase({
                ...purchase,
                iva: ivaList.find((iva) => iva.value === ivaId)?.value ?? 0,
            });
        } else {
            addSale({
                ...sale,
                iva: ivaList.find((iva) => iva.value === ivaId)?.value ?? 0,
            });
        }
    };

    return (
        <>
            <div className="flex flex-col gap-1 items-start  md:gap-3 text-gray-800">
                <label htmlFor="iva" className="font-semibold">
                    Seleccionar Iva
                </label>
                <div className=" w-full items-center gap-2">
                    <Controller
                        name={'iva' as Path<T>}
                        control={control}
                        rules={{
                            validate: (value) =>
                                ivaList.some((iva) => iva.value === value)
                                    ? true
                                    : 'El iva es obligatorio',
                        }}
                        render={({ field }) => (
                            <AutoCompleteSearch
                                options={ivaList.map((iva) => ({
                                    value: iva.value,
                                    label: iva.value.toString() + ' %',
                                }))}
                                value={
                                    typeof filters.ivaId === 'undefined'
                                        ? 0
                                        : filters.ivaId
                                }
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleIvaChange(value);
                                }}
                                title="Iva"
                                isSelect={true}
                            />
                        )}
                    />
                    {errors.iva?.message && (
                        <p className="text-red-500">
                            {String(errors.iva.message)}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
