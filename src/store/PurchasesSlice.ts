import {
    initialPurchase,
    Purchase,
    PurchasesSlice,
} from '@/types/zustandTypes';
import { calculateTransactionTotal } from '@/utils/calculateTransactionTotal ';
import { StateCreator } from 'zustand';

export const createPurchasesSlice: StateCreator<
    PurchasesSlice,
    [],
    [],
    PurchasesSlice
> = (set, get) => ({
    purchase: initialPurchase,
    addPurchase: (newPurchase: Partial<Purchase>) => {
        const currentPurchase = get().purchase;

        const subtotal = currentPurchase.detailsPurchases.reduce(
            (acc, item) => {
                console.log(item);
                return acc + item.subtotal;
            },
            0,
        );
        set((state) => ({
            purchase: {
                ...state.purchase,
                ...newPurchase,
                subtotal,
                total: calculateTransactionTotal({
                    subtotalDetails: subtotal,
                    discount: get().purchase.discount,
                    iva: get().purchase.iva,
                }),
            },
        }));
    },
});
