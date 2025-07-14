import { useQuery } from '@tanstack/react-query';
import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import PageTitle from '../../../components/Utils/PageTitle';
import { getProductsApi } from '@/api/product/product';
import Spinner from '@/components/Utils/Spinner';
import { useAppStore } from '@/store/useAppStore';
import { ModalKeyList } from '@/types/zustandTypes';
import InputFileUpload from '@/components/Utils/InputFileUpload';
import { getPaymentMethodsApi } from '@/api/paymentMethods/paymentMethods';
import { getLastInvoiceNumber, uploadSaleInvoiceAPI } from '@/api/sale/sale';
import FormSales from '@/components/sale/registerSales/FormSales';
import { getBanksAPI } from '@/api/catalogs/bank';
import InvoiceModal from '@/components/Utils/InvoiceModal';

export default function RegisterSaleView() {
    const finalizedSaleId = useAppStore((store) => store.finalizedSaleId);

    const isActiveModal = useAppStore((store) => store.isActiveModal);
    const activeModalKey = useAppStore((store) => store.activeModalKey);
    const addedFromModal = useAppStore((store) => store.addedFromModal);

    const lastInvoiceNumber = useQuery({
        queryKey: ['invoiceNumber'],
        queryFn: getLastInvoiceNumber,
    });
    const banks = useQuery({
        queryKey: ['banks'],
        queryFn: getBanksAPI,
    });

    const paymentMethods = useQuery({
        queryKey: ['paymentMethods'],
        queryFn: getPaymentMethodsApi,
    });

    const products = useQuery({
        queryKey: ['products'],
        queryFn: getProductsApi,
    });

    const handleCloseUploadInvoiceModal = () => {
        addedFromModal(false, ModalKeyList.SaleInvoice);
        addedFromModal(true, ModalKeyList.SaleInvoice);
    };

    const queries = [paymentMethods, products, lastInvoiceNumber, banks];

    if (queries.some((query) => query.isLoading)) return <Spinner />;
    if (products.data && products.data.length === 0)
        return (
            <div className="flex justify-center items-center gap-3 min-h-[90vh]">
                <p className="text-center text-gray-800 text-xl">
                    No hay productos registrados aún. Registre para poder
                    empezar a registrar ventas
                </p>
            </div>
        );

    if (
        paymentMethods.data &&
        products.data &&
        lastInvoiceNumber.data &&
        banks.data
    )
        return (
            <>
                <PageTitle title={'Registrar venta'} />

                <div className="flex flex-col gap-5 bg-white p-5 rounded-b-lg shadow-lg  ">
                    <FormSales
                        lastInvoiceNumber={lastInvoiceNumber.data}
                        banks={banks.data}
                        paymentMethods={paymentMethods.data}
                        products={products.data}
                    />
                </div>

                {isActiveModal &&
                    activeModalKey === 'uploadBankInvoiceReference' && (
                        <Dialog open={isActiveModal} fullWidth maxWidth="sm">
                            <div className="relative flex items-center justify-center w-full border-b-2 pb-2">
                                <DialogTitle className="text-2xl text-center w-4/5">
                                    ¿Desea subir una foto o documento de la
                                    referencia de la transacción?
                                </DialogTitle>
                                <Close
                                    className="absolute right-4 top-2 text-slate-700 border-orange-800 cursor-pointer"
                                    onClick={handleCloseUploadInvoiceModal}
                                />
                            </div>
                            <DialogContent className="flex justify-around my-5">
                                <div className="flex justify-center w-72 mx-auto">
                                    <InputFileUpload
                                        text="Subir factura"
                                        infoCache="sale"
                                        mutationFn={uploadSaleInvoiceAPI}
                                        id={finalizedSaleId}
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}

                {isActiveModal && activeModalKey === 'saleInvoice' && (
                    <InvoiceModal
                        id={finalizedSaleId}
                        title="¿Desea imprimir la factura?"
                        modalType={ModalKeyList.SaleInvoice}
                    />
                )}
            </>
        );
}
