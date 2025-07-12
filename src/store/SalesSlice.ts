import { SalesSlice, RegisterSaleForm } from '@/types/zustandTypes';
import { StateCreator } from 'zustand';
import { initialSale } from '../data';
import { calculateTransactionTotal } from '@/utils/calculateTransactionTotal ';

export const createSalesSlice: StateCreator<SalesSlice, [], [], SalesSlice> = (
    set,
    get,
) => ({
    sale: initialSale,
    finalizedSaleId: 0,
    addSale: (newSale: RegisterSaleForm) => {
        const subtotal = newSale.detailsSales.reduce((acc, item) => {
            return acc + item.subtotal;
        }, 0);
        set(() => ({
            sale: {
                ...newSale,
                subtotal,
                total: calculateTransactionTotal({
                    subtotalDetails: subtotal,
                    discount: newSale.discount,
                    iva: newSale.iva,
                }),
            },
        }));
    },
    removeProductFromSale: (id: number) => {
        const currentSale = get().sale;
        const filteredDetails = currentSale.detailsSales.filter(
            (product) => product.storedProductsId !== id,
        );
        const subtotal = filteredDetails.reduce(
            (acc, item) => acc + item.subtotal,
            0,
        );
        set((state) => ({
            sale: {
                ...state.sale,
                detailsSales: filteredDetails,
                subtotal,
                total: calculateTransactionTotal({
                    subtotalDetails: subtotal,
                    discount: get().sale.discount,
                    iva: get().sale.iva,
                }),
            },
        }));
    },
    resetSale: () => {
        set(() => ({
            sale: initialSale,
        }));
    },
    saveFinalizedSaleId: (saleId: number) => {
        set(() => ({
            finalizedSaleId: saleId,
        }));
    },
});
