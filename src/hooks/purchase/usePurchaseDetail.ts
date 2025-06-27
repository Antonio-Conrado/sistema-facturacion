import { useAppStore } from '@/store/useAppStore';
import { RegisterDetailsTransaction } from '@/types/zustandTypes';
import { calculateSubtotalOfDetails } from '@/utils/calculateSubtotalOfDetails';

type usePurchasesProps = {
    row: RegisterDetailsTransaction;
};

export default function usePurchaseDetail({ row }: usePurchasesProps) {
    const purchase = useAppStore((store) => store.purchase);
    const addPurchase = useAppStore((store) => store.addPurchase);

    const updateDetailField = <
        DetailFieldKey extends keyof RegisterDetailsTransaction,
    >(
        field: DetailFieldKey,
        value: RegisterDetailsTransaction[DetailFieldKey],
    ) => {
        const updatedDetails = purchase.detailsPurchases.map((detail) => {
            if (detail.storedProductsId !== row.storedProductsId) return detail;

            const updatedDetail = {
                ...detail,
                [field]: value,
            };

            const subtotal = calculateSubtotalOfDetails({
                purchasePrice: updatedDetail.purchasePrice,
                amount: updatedDetail.amount,
                discount: updatedDetail.discount,
                type: 'PURCHASE',
            });

            return {
                ...updatedDetail,
                subtotal,
            };
        });

        addPurchase({
            ...purchase,
            detailsPurchases: updatedDetails,
        });
    };

    const handleDetailChange = <Field extends keyof RegisterDetailsTransaction>(
        name: Field,
        value: RegisterDetailsTransaction[Field],
    ) => {
        updateDetailField(name, value);
    };

    return {
        handleDetailChange,
    };
}
