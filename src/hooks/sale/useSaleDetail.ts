import { useAppStore } from '@/store/useAppStore';
import { RegisterSaleDetailsTransaction } from '@/types/zustandTypes';
import { calculateSubtotalOfDetails } from '@/utils/calculateSubtotalOfDetails';

type useSalesProps = {
    row: RegisterSaleDetailsTransaction;
};

export default function useSaleDetail({ row }: useSalesProps) {
    const sale = useAppStore((store) => store.sale);
    const addSale = useAppStore((store) => store.addSale);

    const updateDetailField = <
        DetailFieldKey extends keyof RegisterSaleDetailsTransaction,
    >(
        field: DetailFieldKey,
        value: RegisterSaleDetailsTransaction[DetailFieldKey],
    ) => {
        const updatedDetails = sale.detailsSales.map((detail) => {
            if (detail.storedProductsId !== row.storedProductsId) return detail;

            const updatedDetail = {
                ...detail,
                [field]: value,
            };

            const subtotal = calculateSubtotalOfDetails({
                salePrice: updatedDetail.price,
                amount: updatedDetail.amount,
                discount: updatedDetail.discount,
                type: 'SALE',
            });

            return {
                ...updatedDetail,
                subtotal,
            };
        });

        addSale({
            ...sale,
            detailsSales: updatedDetails,
        });
    };

    const handleDetailChange = <
        Field extends keyof RegisterSaleDetailsTransaction,
    >(
        name: Field,
        value: RegisterSaleDetailsTransaction[Field],
    ) => {
        updateDetailField(name, value);
    };

    return {
        handleDetailChange,
    };
}
