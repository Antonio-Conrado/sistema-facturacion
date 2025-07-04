import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSaleDetailsApi } from '@/api/sale/sale';
import SaleGeneralDetails from '@/components/sale/saleHistory/SaleGeneralDetails';
import SaleTable from '@/components/sale/saleHistory/SaleTable';
import SaleTotalDetails from '@/components/sale/saleHistory/SaleTotalsDetails';
import DataNotFound from '@/components/Utils/DataNotFound';
import PageTitle from '@/components/Utils/PageTitle';
import Spinner from '@/components/Utils/Spinner';
import { getPaymentMethodsApi } from '@/api/paymentMethods/paymentMethods';

export default function SaleDetailView() {
    const params = useParams();
    const id = +params.id!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['sale', id],
        queryFn: () => getSaleDetailsApi(id),
        retry: 2,
    });

    const paymentMethods = useQuery({
        queryKey: ['paymentMethods'],
        queryFn: getPaymentMethodsApi,
    });

    if (isLoading || paymentMethods.isLoading) return <Spinner />;
    if (isError || paymentMethods.isError) return <DataNotFound />;
    if (data && paymentMethods.data)
        return (
            <>
                <PageTitle title={`Venta número ${data.invoiceNumber}`} />

                <div className="flex flex-col gap-5 bg-white p-5 rounded-b-lg shadow-lg ">
                    <SaleGeneralDetails sale={data} />

                    <div className="flex flex-col gap-5 sm:flex-row md:gap-0 justify-between items-center py-5">
                        <SaleTable data={data.detailsSales} />
                    </div>

                    <SaleTotalDetails sale={data} />
                </div>
            </>
        );
}
