import { ReactElement, useEffect, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import InvoiceDocument from './InvoiceDocument';
import { getBusinessDataAPI } from '@/api/businessData/businessData';
import useToast from '@/hooks/useNotifications';
import { getSaleDetailsApi } from '@/api/sale/sale';
import Spinner from '../Utils/Spinner';

type InvoiceModalProps = {
    id: number;
};

const InvoiceDownload = ({ id }: InvoiceModalProps) => {
    const [isDownload, setIsDownload] = useState(false);
    const toast = useToast();

    const businessData = useQuery({
        queryKey: ['businessData'],
        queryFn: getBusinessDataAPI,
    });

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['saleInvoice', id],
        queryFn: () => getSaleDetailsApi(id),
        enabled: isDownload,
    });

    const handleViewAndPrint = async () => {
        if (!isLoading && isSuccess && data && businessData.data) {
            const pdfDocument: ReactElement = (
                <InvoiceDocument data={data} businessData={businessData.data} />
            );

            if (pdfDocument.props.data) {
                const pdfBlob = await pdf(pdfDocument).toBlob();
                const objectUrl = URL.createObjectURL(pdfBlob);
                window.open(objectUrl, '_blank');
            } else {
                toast.error(
                    'Algo salió mal al generar la factura. Revise el historial para confirmar el registro',
                );
            }
        }
    };

    useEffect(() => {
        handleViewAndPrint();
    }, [isDownload, isLoading, isSuccess]);

    if (isLoading) return <Spinner />;

    return (
        <div className="mt-4">
            <button
                onClick={() => setIsDownload(!isDownload)}
                className="bg-green-600 hover:bg-green-800 text-white p-3 rounded-lg"
            >
                Ver factura
            </button>
        </div>
    );
};

export default InvoiceDownload;
