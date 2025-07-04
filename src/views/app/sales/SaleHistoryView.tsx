import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPaymentMethodsApi } from '@/api/paymentMethods/paymentMethods';
import { filterSaleByTermAPI, getSalesApi } from '@/api/sale/sale';
import { getUsersAPI } from '@/api/user/user';
import FilterSales from '@/components/sale/saleHistory/FilterSales';
import SalesData from '@/components/sale/saleHistory/SalesData';
import DataNotFound from '@/components/Utils/DataNotFound';
import PageTitle from '@/components/Utils/PageTitle';
import Spinner from '@/components/Utils/Spinner';
import { SearchFilterValues } from '@/types/index';

export default function SaleHistoryView() {
    const [filteredSalesByTerm, setFilteredSalesByTerm] = useState<
        Partial<SearchFilterValues>
    >({});

    const sales = useQuery({
        queryKey: ['sales', 10, 0],
        queryFn: () => getSalesApi({ take: 10, skip: 0 }),
    });

    const paymentMethods = useQuery({
        queryKey: ['paymentMethods'],
        queryFn: getPaymentMethodsApi,
    });

    const users = useQuery({
        queryKey: ['AllUsers'],
        queryFn: getUsersAPI,
    });

    const filteredSales = useQuery({
        queryKey: ['saleFilters', 10, 0, filteredSalesByTerm],
        queryFn: () =>
            filterSaleByTermAPI({
                term: filteredSalesByTerm,
                take: 10,
                skip: 0,
            }),
        enabled: Object.entries(filteredSalesByTerm).length > 0,
    });

    const queries = [sales, users, paymentMethods];
    if (queries.some((query) => query.isLoading)) return <Spinner />;
    if (queries.some((query) => query.isError)) return <DataNotFound />;

    if (sales.data && paymentMethods.data && users.data)
        return (
            <>
                <PageTitle title="Ventas" />
                <div className="bg-white p-5 rounded-b-lg shadow-lg">
                    <FilterSales
                        paymentMethods={paymentMethods.data}
                        users={users.data}
                        setFilteredSalesByTerm={setFilteredSalesByTerm}
                    />

                    <div className="flex flex-col gap-5 sm:flex-row md:gap-0 justify-between items-center mb-8">
                        <SalesData
                            data={
                                filteredSales.data?.sales !== undefined
                                    ? filteredSales.data.sales
                                    : sales.data.sales
                            }
                            total={
                                filteredSales.data?.sales !== undefined
                                    ? filteredSales.data.total
                                    : sales.data.total
                            }
                            isFiltered={
                                filteredSales.data?.sales !== undefined
                                    ? true
                                    : false
                            }
                            filteredSalesByTerm={filteredSalesByTerm}
                        />
                    </div>
                </div>
            </>
        );
}
