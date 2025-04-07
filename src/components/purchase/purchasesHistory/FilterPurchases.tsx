import AutoCompleteSearch from '@/components/Utils/AutoCompleteSearch';
import {
    SearchFilterEnum,
    SearchFilterValues,
    Suppliers,
    Users,
} from '@/types/index';
import { useEffect, useState } from 'react';

type FilterPurchasesProps = {
    suppliers: Suppliers;
    users: Users;
    setFilteredPurchasesByTerm: React.Dispatch<
        React.SetStateAction<Partial<SearchFilterValues>>
    >;
};

export default function FilterPurchases({
    suppliers,
    users,
    setFilteredPurchasesByTerm,
}: FilterPurchasesProps) {
    const [filters, setFilters] = useState<Partial<SearchFilterValues>>({});

    useEffect(() => {
        const newFilters: Partial<SearchFilterValues> = {};

        if (filters.invoiceNumber) {
            newFilters[SearchFilterEnum.invoiceNumber] = filters.invoiceNumber;
        }
        if (filters.suppliersId) {
            newFilters[SearchFilterEnum.suppliersId] = filters.suppliersId;
        }
        if (filters.usersId) {
            newFilters[SearchFilterEnum.usersId] = filters.usersId;
        }
        setFilteredPurchasesByTerm(newFilters);
    }, [filters, setFilteredPurchasesByTerm]);

    const handleInvoiceNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = e.target.value;
        setFilters({ invoiceNumber: value });
    };

    const handleSupplierChange = (suppliersId: number | null) => {
        setFilters({ suppliersId: suppliersId ?? null });
    };

    const handleUserChange = (usersId: number | null) => {
        setFilters({ usersId: usersId ?? null });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-3 md:gap-0 mt-3 mb-5">
            <div className="flex flex-col md:flex-row items-center gap-3">
                <AutoCompleteSearch
                    options={suppliers.map((supplier) => ({
                        value: supplier.id,
                        label: supplier.name,
                    }))}
                    value={filters.suppliersId ?? null}
                    onChange={handleSupplierChange}
                    title="Proveedores"
                />

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
