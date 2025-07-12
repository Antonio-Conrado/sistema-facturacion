import AutoCompleteSearch from '@/components/Utils/AutoCompleteSearch';
import { useAppStore } from '@/store/useAppStore';
import { SearchFilterValues, Suppliers } from '@/types/index';
import { Add } from '@mui/icons-material';
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
} from 'react-hook-form';
import { Dispatch } from 'react';

type SelectSupplierProps<T extends FieldValues> = {
    suppliers: Suppliers;
    errors: FieldErrors<T>;
    control: Control<T, unknown, T>;
    filters: Partial<SearchFilterValues>;
    setFilters: Dispatch<React.SetStateAction<Partial<SearchFilterValues>>>;
};

export default function SelectSupplier<T extends FieldValues>({
    suppliers,
    errors,
    control,
    filters,
    setFilters,
}: SelectSupplierProps<T>) {
    const purchase = useAppStore((store) => store.purchase);
    const addPurchase = useAppStore((store) => store.addPurchase);

    const addedFromModal = useAppStore((store) => store.addedFromModal);
    const handleSupplierChange = (suppliersId: number | null) => {
        setFilters((prev) => ({
            ...prev,
            suppliersId: suppliersId ?? null,
        }));

        addPurchase({
            ...purchase,
            suppliersId: suppliersId ? suppliersId : 0,
        });
    };

    return (
        <div className="flex flex-col gap-1  items-start  md:gap-3 text-gray-800">
            <label htmlFor="supplier" className="font-semibold">
                Seleccionar Proveedor
            </label>
            <div className="flex w-full items-center gap-2">
                <Controller
                    name={'suppliersId' as Path<T>}
                    control={control}
                    rules={{
                        validate: (value) =>
                            (value && value !== 0) ||
                            'El proveedor es obligatorio',
                    }}
                    render={({ field }) => (
                        <AutoCompleteSearch
                            options={suppliers
                                .filter((supplier) => supplier.status === true)
                                .map((supplier) => ({
                                    value: supplier.id,
                                    label: supplier.name,
                                }))}
                            value={
                                purchase.suppliersId
                                    ? purchase.suppliersId
                                    : filters.suppliersId ?? null
                            }
                            onChange={(value) => {
                                field.onChange(value);
                                handleSupplierChange(value);
                            }}
                            title="Proveedor"
                            isSelect={true}
                        />
                    )}
                />

                <Add onClick={() => addedFromModal(true, 'suppliers')} />
            </div>
            {errors.suppliersId?.message && (
                <p className="text-red-500">
                    {String(errors.suppliersId.message)}
                </p>
            )}
        </div>
    );
}
