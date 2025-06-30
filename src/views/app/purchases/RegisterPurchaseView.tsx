import { useQuery } from '@tanstack/react-query';
import PageTitle from '../../../components/Utils/PageTitle';
import { getProductsApi } from '@/api/product/product';
import Spinner from '@/components/Utils/Spinner';
import FormPurchases from '../../../components/purchase/registerPurchases/FormPurchases';
import { getSuppliersAPI } from '@/api/catalogs/supplier';
import { useAppStore } from '@/store/useAppStore';
import { ModalKeyList } from '@/types/zustandTypes';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';
import InputFileUpload from '@/components/Utils/InputFileUpload';
import { uploadPurchaseInvoiceAPI } from '@/api/purchase/purchase';

export default function RegisterPurchaseView() {
    const finalizedPurchaseId = useAppStore(
        (store) => store.finalizedPurchaseId,
    );

    const isActiveModal = useAppStore((store) => store.isActiveModal);
    const activeModalKey = useAppStore((store) => store.activeModalKey);
    const addedFromModal = useAppStore((store) => store.addedFromModal);

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

                {isActiveModal && activeModalKey === 'purchaseInvoice' && (
                    <Dialog open={isActiveModal} fullWidth maxWidth="sm">
                        <div className="relative flex items-center justify-center w-full border-b-2 pb-2">
                            <DialogTitle className="text-2xl text-center w-4/5">
                                ¿Desea subir una foto o documento de la factura?
                            </DialogTitle>
                            <Close
                                className="absolute right-4 top-2 text-slate-700 border-orange-800 cursor-pointer"
                                onClick={() =>
                                    addedFromModal(
                                        false,
                                        ModalKeyList.PurchaseInvoice,
                                    )
                                }
                            />
                        </div>
                        <DialogContent className="flex justify-around my-5">
                            <div className="flex justify-center w-72 mx-auto">
                                <InputFileUpload
                                    text="Subir factura"
                                    infoCache="purchase"
                                    mutationFn={uploadPurchaseInvoiceAPI}
                                    id={finalizedPurchaseId}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </>
        );
}
