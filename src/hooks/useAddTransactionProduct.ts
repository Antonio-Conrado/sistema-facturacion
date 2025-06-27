import { useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useQuery } from '@tanstack/react-query';
import { getProductsApi } from '@/api/product/product';
import { calculateSubtotalOfDetails } from '@/utils/calculateSubtotalOfDetails';
import { StoredProduct } from '../types';
import { RegisterDetailsTransaction } from '@/types/zustandTypes';

type UseTransactionProps = {
    transactionType: 'PURCHASES' | 'SALES';
};

export default function useAddTransactionProduct({
    transactionType,
}: UseTransactionProps) {
    const addPurchase = useAppStore((store) => store.addPurchase);
    const purchase = useAppStore((store) => store.purchase);

    const product = useQuery({
        queryKey: ['products'],
        queryFn: getProductsApi,
    });

    const isProductAlreadyAdded = useCallback(
        (productId: number) => {
            const transaction =
                transactionType === 'PURCHASES'
                    ? purchase.detailsPurchases
                    : [];
            return transaction.some(
                (item) => item.storedProductsId === productId,
            );
        },
        [purchase.detailsPurchases, transactionType],
    );

    const handleAddProductById = (id: number) => {
        if (isProductAlreadyAdded(id)) return;
        if (!product.data) return;

        const filteredProduct = product.data.find(
            (product) => product.id === id,
        );
        if (!filteredProduct) return;
        createTransactionDetail(filteredProduct, transactionType);
    };

    const createTransactionDetail = (
        filteredProduct: StoredProduct,
        type: typeof transactionType,
    ) => {
        if (type === 'PURCHASES') {
            const newDetail: RegisterDetailsTransaction = {
                storedProductsId: filteredProduct.id,
                code: filteredProduct.detailsProducts.products.code,
                name: filteredProduct.detailsProducts.products.name,
                image: filteredProduct.detailsProducts.image ?? '',
                amount: 1,
                discount: 0,
                subtotal: calculateSubtotalOfDetails({
                    purchasePrice: filteredProduct.purchasePrice,
                    amount: 1,
                    discount: 0,
                    type: 'PURCHASE',
                }),
                salePrice: filteredProduct.salePrice ?? 0,
                purchasePrice:
                    transactionType === 'PURCHASES'
                        ? filteredProduct.purchasePrice ?? 0
                        : 0,
            };
            addPurchase({
                ...purchase,
                detailsPurchases: [...purchase.detailsPurchases, newDetail],
            });
        } else {
            console.log('sales');
        }
    };

    return { handleAddProductById };
}
