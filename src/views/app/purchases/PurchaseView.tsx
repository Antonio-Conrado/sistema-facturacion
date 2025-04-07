import { getPurchaseDetailsApi } from '@/api/purchase/purchase';
import PurchaseGeneralDetails from '@/components/purchase/purchasesHistory/PurchaseGeneralDetails';
import PurchaseTable from '@/components/purchase/purchasesHistory/PurchaseTable';
import PurchaseTotalDetails from '@/components/purchase/purchasesHistory/PurchaseTotalsDetails';

import DataNotFound from '@/components/Utils/DataNotFound';
import PageTitle from '@/components/Utils/PageTitle';
import Spinner from '@/components/Utils/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function PurchaseDetailView() {
    const params = useParams();
    const id = +params.id!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['purchase', id],
        queryFn: () => getPurchaseDetailsApi(id),
        retry: 2,
    });

    if (isLoading) return <Spinner />;
    if (isError) return <DataNotFound />;
    if (data)
        return (
            <>
                <PageTitle title={`Compra número ${data.invoiceNumber}`} />

                <div className="flex flex-col gap-5 bg-white p-5 rounded-b-lg shadow-lg ">
                    <PurchaseGeneralDetails purchase={data} />

                    <div className="flex flex-col gap-5 sm:flex-row md:gap-0 justify-between items-center py-5">
                        <PurchaseTable data={data.detailsPurchases} />
                    </div>

                    <PurchaseTotalDetails purchase={data} />
                </div>
            </>
        );
}
