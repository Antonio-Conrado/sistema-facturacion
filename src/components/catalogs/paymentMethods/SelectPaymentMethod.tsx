import { Dispatch } from 'react';
import AutoCompleteSearch from '@/components/Utils/AutoCompleteSearch';
import { useAppStore } from '@/store/useAppStore';
import { PaymentMethods, SearchFilterValues } from '@/types/index';
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
} from 'react-hook-form';

type SelectPaymentMethodProps<T extends FieldValues> = {
    paymentMethods: PaymentMethods;
    errors: FieldErrors<T>;
    control: Control<T, unknown, T>;
    filters: Partial<SearchFilterValues>;
    setFilters: Dispatch<React.SetStateAction<Partial<SearchFilterValues>>>;
};

export default function SelectPaymentMethod<T extends FieldValues>({
    paymentMethods,
    errors,
    control,
    filters,
    setFilters,
}: SelectPaymentMethodProps<T>) {
    const sale = useAppStore((store) => store.sale);
    const addSale = useAppStore((store) => store.addSale);

    const handlePaymentMethodChange = (paymentMethodId: number | null) => {
        setFilters((prev) => ({
            ...prev,
            paymentMethodId: paymentMethodId ?? null,
        }));

        addSale({
            ...sale,
            paymentMethodId: paymentMethodId ? paymentMethodId : 0,
        });
    };

    return (
        <div className="flex flex-col gap-1 items-start md:gap-3 text-gray-800">
            <label htmlFor="paymentMethod" className="font-semibold">
                Seleccionar método de pago
            </label>
            <div className="w-full items-center gap-2">
                <Controller
                    name={'paymentMethodId' as Path<T>}
                    control={control}
                    rules={{
                        validate: (value) =>
                            (value && value !== 0) ||
                            'El método de pago es obligatorio',
                    }}
                    render={({ field }) => (
                        <AutoCompleteSearch
                            options={paymentMethods.map((paymentMethod) => ({
                                value: paymentMethod.id,
                                label: paymentMethod.name,
                            }))}
                            value={
                                sale.paymentMethodId
                                    ? sale.paymentMethodId
                                    : filters.paymentMethodId ?? null
                            }
                            onChange={(value) => {
                                field.onChange(value);
                                handlePaymentMethodChange(value);
                            }}
                            title="Método de pago"
                            isSelect={true}
                        />
                    )}
                />
                {errors.paymentMethodId?.message && (
                    <p className="text-red-500">
                        {String(errors.paymentMethodId.message)}
                    </p>
                )}
            </div>
        </div>
    );
}
