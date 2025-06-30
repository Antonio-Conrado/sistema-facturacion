import { RegisterPurchaseForm, PurchasesSlice } from '@/types/zustandTypes';
import { calculateTransactionTotal } from '@/utils/calculateTransactionTotal ';
import { StateCreator } from 'zustand';
import { initialPurchase } from '../data';

export const createPurchasesSlice: StateCreator<
    PurchasesSlice,
    [],
    [],
    PurchasesSlice
> = (set, get) => ({
    purchase: initialPurchase,
    finalizedPurchaseId: 0,
    addPurchase: (newPurchase: RegisterPurchaseForm) => {
        const subtotal = newPurchase.detailsPurchases.reduce((acc, item) => {
            return acc + item.subtotal;
        }, 0);

        set(() => ({
            purchase: {
                ...newPurchase,
                subtotal,
                total: calculateTransactionTotal({
                    subtotalDetails: subtotal,
                    discount: newPurchase.discount,
                    iva: newPurchase.iva,
                }),
            },
        }));
    },
    removeProductFromPurchase: (id: number) => {
        const currentPurchase = get().purchase;
        const filteredDetails = currentPurchase.detailsPurchases.filter(
            (product) => product.storedProductsId !== id,
        );

        const subtotal = filteredDetails.reduce(
            (acc, item) => acc + item.subtotal,
            0,
        );

        set((state) => ({
            purchase: {
                ...state.purchase,
                detailsPurchases: filteredDetails,
                subtotal,
                total: calculateTransactionTotal({
                    subtotalDetails: subtotal,
                    discount: get().purchase.discount,
                    iva: get().purchase.iva,
                }),
            },
        }));
    },
    resetPurchase: () => {
        set(() => ({
            purchase: initialPurchase,
        }));
    },
    saveFinalizedPurchaseId: (purchaseId: number) => {
        set(() => ({
            finalizedPurchaseId: purchaseId,
        }));
    },
});
