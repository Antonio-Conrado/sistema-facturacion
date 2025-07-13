import { useEffect, useState } from 'react';
import AutoCompleteSearch from '@/components/Utils/AutoCompleteSearch';
import {
    PaymentMethods,
    SearchFilterEnum,
    SearchFilterValues,
    Users,
} from '@/types/index';

type FilterSalesProps = {
    paymentMethods: PaymentMethods;
    users: Users;
    setFilteredSalesByTerm: React.Dispatch<
        React.SetStateAction<Partial<SearchFilterValues>>
    >;
};

export default function FilterSales({
    paymentMethods,
    users,
    setFilteredSalesByTerm,
}: FilterSalesProps) {
    const [filters, setFilters] = useState<Partial<SearchFilterValues>>({});

    useEffect(() => {
        const newFilters: Partial<SearchFilterValues> = {};

        if (filters.invoiceNumber) {
            newFilters[SearchFilterEnum.invoiceNumber] = filters.invoiceNumber;
        }
        if (filters.paymentMethodId) {
            newFilters[SearchFilterEnum.paymentMethodId] =
                filters.paymentMethodId;
        }
        if (filters.usersId) {
            newFilters[SearchFilterEnum.usersId] = filters.usersId;
        }
        setFilteredSalesByTerm(newFilters);
    }, [filters, setFilteredSalesByTerm]);

    const handleInvoiceNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = e.target.value;
        setFilters({ invoiceNumber: value });
    };

    const handlePaymentMethodChange = (paymentMethodId: number | null) => {
        setFilters({ paymentMethodId: paymentMethodId ?? null });
    };

    const handleUserChange = (usersId: number | null) => {
        setFilters({ usersId: usersId ?? null });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-3 md:gap-0 mt-3 mb-5">
            <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="flex items-center">
                    <AutoCompleteSearch
                        options={paymentMethods.map((paymentMethod) => ({
                            value: paymentMethod.id,
                            label: paymentMethod.name,
                        }))}
                        value={filters.paymentMethodId ?? null}
                        onChange={handlePaymentMethodChange}
                        title="Métodos de pagos"
                    />
                </div>

                <div className="flex items-center">
                    {' '}
                    <AutoCompleteSearch
                        options={users.map((user) => ({
                            value: user.id,
                            label: `${user.name} ${user.surname}`,
                        }))}
                        value={filters.usersId ?? null}
                        onChange={handleUserChange}
                        title="Usuarios"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
                <input
                    type="text"
                    className="p-2 rounded-lg border-2 border-gray-300 w-auto sm:w-[310px] md:w-[330px]"
                    onChange={handleInvoiceNumberChange}
                    placeholder="Ingresa tu búsqueda por número de factura"
                    value={filters.invoiceNumber ?? ''}
                />
            </div>
        </div>
    );
}
