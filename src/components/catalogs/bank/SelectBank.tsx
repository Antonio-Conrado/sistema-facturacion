import AutoCompleteSearch from '@/components/Utils/AutoCompleteSearch';
import { useAppStore } from '@/store/useAppStore';
import { Banks, SearchFilterValues } from '@/types/index';
import { Add } from '@mui/icons-material';
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
} from 'react-hook-form';
import { Dispatch } from 'react';

type SelectBankProps<T extends FieldValues> = {
    banks: Banks;
    errors: FieldErrors<T>;
    control: Control<T, unknown, T>;
    filters: Partial<SearchFilterValues>;
    setFilters: Dispatch<React.SetStateAction<Partial<SearchFilterValues>>>;
};

export default function SelectBank<T extends FieldValues>({
    banks,
    errors,
    control,
    filters,
    setFilters,
}: SelectBankProps<T>) {
    const sale = useAppStore((store) => store.sale);
    const addSale = useAppStore((store) => store.addSale);

    const addedFromModal = useAppStore((store) => store.addedFromModal);
    const handleBankChange = (bankId: number | null) => {
        setFilters((prev) => ({
            ...prev,
            bankId: bankId ?? null,
        }));

        addSale({
            ...sale,
            bankId: bankId ? bankId : 0,
        });
    };

    return (
        <div className="flex flex-col gap-1 items-start  md:gap-3 text-gray-800">
            <label htmlFor="bank" className="font-semibold">
                Seleccionar Banco
            </label>
            <div className=" flex w-full items-center gap-2">
                <Controller
                    name={'bankId' as Path<T>}
                    control={control}
                    rules={{
                        validate: (value) =>
                            (value && value !== 0) || 'El banco es obligatorio',
                    }}
                    render={({ field }) => (
                        <AutoCompleteSearch
                            options={banks
                                .filter((bank) => bank.status === true)
                                .map((bank) => ({
                                    value: bank.id,
                                    label: bank.name,
                                }))}
                            value={
                                sale.bankId
                                    ? sale.bankId
                                    : filters.bankId ?? null
                            }
                            onChange={(value) => {
                                field.onChange(value);
                                handleBankChange(value);
                            }}
                            title="Banco"
                            isSelect={true}
                        />
                    )}
                />

                <Add onClick={() => addedFromModal(true, 'banks')} />
            </div>{' '}
            {errors.bankId?.message && (
                <p className="text-red-500">{String(errors.bankId.message)}</p>
            )}
        </div>
    );
}
