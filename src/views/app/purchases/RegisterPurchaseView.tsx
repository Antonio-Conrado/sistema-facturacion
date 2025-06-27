import { useQuery } from '@tanstack/react-query';
import PageTitle from '../../../components/Utils/PageTitle';
import { getProductsApi } from '@/api/product/product';
import Spinner from '@/components/Utils/Spinner';
import FormPurchases from '../../../components/purchase/registerPurchases/FormPurchases';
import { getSuppliersAPI } from '@/api/catalogs/supplier';

export default function RegisterPurchaseView() {
    const suppliers = useQuery({
        queryKey: ['suppliers'],
        queryFn: getSuppliersAPI,
    });

    const products = useQuery({
        queryKey: ['products'],
        queryFn: getProductsApi,
    });

    if (suppliers.isLoading || products.isLoading) return <Spinner />;
    if (products.data && products.data.length === 0)
        return (
            <div className="flex justify-center items-center gap-3 min-h-[90vh]">
                <p className="text-center text-gray-800 text-xl">
                    No hay productos registrados aún. Registre para poder
                    empezar a registrar compras
                </p>
            </div>
        );

    if (suppliers.data && products.data)
        return (
            <>
                <PageTitle title={'Registrar compra'} />

                <div className="flex flex-col gap-5 bg-white p-5 rounded-b-lg shadow-lg  ">
                    <FormPurchases
                        suppliers={suppliers.data}
                        products={products.data}
                    />
                </div>
            </>
        );
}
