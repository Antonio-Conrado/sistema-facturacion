import { getSuppliersAPI } from '@/api/catalogs/supplier';
import {
    filterPurchaseByTermAPI,
    getPurchasesApi,
} from '@/api/purchase/purchase';
import { getUsersAPI } from '@/api/user/user';
import FilterPurchases from '@/components/purchase/purchasesHistory/FilterPurchases';
import PurchasesData from '@/components/purchase/purchasesHistory/PurchasesData';
import DataNotFound from '@/components/Utils/DataNotFound';
import PageTitle from '@/components/Utils/PageTitle';
import Spinner from '@/components/Utils/Spinner';
import { SearchFilterValues } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function PurchaseHistoryView() {
    const [filteredPurchasesByTerm, setFilteredPurchasesByTerm] = useState<
        Partial<SearchFilterValues>
    >({});

    const purchases = useQuery({
        queryKey: ['purchases', 10, 0],
        queryFn: () => getPurchasesApi({ take: 10, skip: 0 }),
    });

    // Fetches the necessary data (suppliers and users) for filtering purchases by term.
    // If the data is not already available in the system, it will be retrieved and cached for later use.
    const suppliers = useQuery({
        queryKey: ['suppliers'],
        queryFn: getSuppliersAPI,
    });

    const users = useQuery({
        queryKey: ['AllUsers'],
        queryFn: getUsersAPI,
    });

    const filteredPurchases = useQuery({
        queryKey: ['purchaseFilters', 10, 0, filteredPurchasesByTerm],
        queryFn: () =>
            filterPurchaseByTermAPI({
                term: filteredPurchasesByTerm,
                take: 10,
                skip: 0,
            }),
        enabled: Object.entries(filteredPurchasesByTerm).length > 0,
    });

    const queries = [purchases, suppliers, users];
    if (queries.some((query) => query.isLoading)) return <Spinner />;
    if (queries.some((query) => query.isError)) return <DataNotFound />;

    if (suppliers.data && purchases.data && users.data)
        return (
            <>
                <PageTitle title="Compras" />
                <div className="bg-white p-5 rounded-b-lg shadow-lg">
                    <FilterPurchases
                        suppliers={suppliers.data}
                        users={users.data}
                        setFilteredPurchasesByTerm={setFilteredPurchasesByTerm}
                    />
                    <div className="flex flex-col gap-5 sm:flex-row md:gap-0 justify-between items-center mb-8">
                        <PurchasesData
                            data={
                                filteredPurchases.data?.purchases !== undefined
                                    ? filteredPurchases.data.purchases
                                    : purchases.data.purchases
                            }
                            total={
                                filteredPurchases.data?.purchases !== undefined
                                    ? filteredPurchases.data.total
                                    : purchases.data.total
                            }
                            isFiltered={
                                filteredPurchases.data?.purchases !== undefined
                                    ? true
                                    : false
                            }
                            filteredPurchasesByTerm={filteredPurchasesByTerm}
                        />
                    </div>
                </div>
            </>
        );
}
