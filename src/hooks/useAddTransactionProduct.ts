import { useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useQuery } from '@tanstack/react-query';
import { getProductsApi } from '@/api/product/product';
import { calculateSubtotalOfDetails } from '@/utils/calculateSubtotalOfDetails';
import { StoredProduct } from '../types';
import {
    RegisterDetailsTransaction,
    RegisterSaleDetailsTransaction,
} from '@/types/zustandTypes';
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

type UseTransactionProps<T extends FieldValues> = {
    transactionType: 'PURCHASES' | 'SALES';
    setValue: UseFormSetValue<T>;
};

export default function useAddTransactionProduct<T extends FieldValues>({
    transactionType,
    setValue,
}: UseTransactionProps<T>) {
    const addPurchase = useAppStore((store) => store.addPurchase);
    const purchase = useAppStore((store) => store.purchase);
    const addSale = useAppStore((store) => store.addSale);
    const sale = useAppStore((store) => store.sale);

    const product = useQuery({
        queryKey: ['products'],
        queryFn: getProductsApi,
    });

    const isProductAlreadyAdded = useCallback(
        (productId: number) => {
            const transaction =
                transactionType === 'PURCHASES'
                    ? purchase.detailsPurchases
                    : sale.detailsSales;
            return transaction.some(
                (item) => item.storedProductsId === productId,
            );
        },
        [purchase.detailsPurchases, sale.detailsSales, transactionType],
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

            setValue(
                `detailsPurchases.${newDetail.storedProductsId}.purchasePrice` as Path<T>,
                newDetail.purchasePrice as PathValue<T, Path<T>>,
            );
            setValue(
                `detailsPurchases.${newDetail.storedProductsId}.salePrice` as Path<T>,
                newDetail.salePrice as PathValue<T, Path<T>>,
            );
            setValue(
                `detailsPurchases.${newDetail.storedProductsId}.amount` as Path<T>,
                newDetail.amount as PathValue<T, Path<T>>,
            );
            setValue(
                `detailsPurchases.${newDetail.storedProductsId}.discount` as Path<T>,
                newDetail.discount as PathValue<T, Path<T>>,
            );
        } else {
            const newDetail: RegisterSaleDetailsTransaction = {
                storedProductsId: filteredProduct.id,
                code: filteredProduct.detailsProducts.products.code,
                name: filteredProduct.detailsProducts.products.name,
                image: filteredProduct.detailsProducts.image ?? '',
                amount: 1,
                discount: 0,
                subtotal: calculateSubtotalOfDetails({
                    salePrice: filteredProduct.salePrice,
                    amount: 1,
                    discount: 0,
                    type: 'SALE',
                }),
                price: filteredProduct.salePrice ?? 0,
            };
            addSale({
                ...sale,
                detailsSales: [...sale.detailsSales, newDetail],
            });

            setValue(
                `detailsSales.${newDetail.storedProductsId}.price` as Path<T>,
                newDetail.price as PathValue<T, Path<T>>,
            );

            setValue(
                `detailsSales.${newDetail.storedProductsId}.amount` as Path<T>,
                newDetail.amount as PathValue<T, Path<T>>,
            );
            setValue(
                `detailsSales.${newDetail.storedProductsId}.discount` as Path<T>,
                newDetail.discount as PathValue<T, Path<T>>,
            );
        }
    };

    return { handleAddProductById };
}
