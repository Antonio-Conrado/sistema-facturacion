//* general */
export type ModalKey = 'suppliers' | 'products' | 'categories' | 'default';
export type GeneralSlice = {
    activeModalKey: ModalKey;
    isActiveModal: boolean;
    addedFromModal: (isActiveModal: boolean, activeModalKey: ModalKey) => void;
};

export type DetailsTransaction = {
    storedProductsId: number;
    code: string;
    name: string;
    image: string;
    amount: number;
    purchasePrice: number;
    salePrice: number;
    discount: number;
    subtotal: number;
};

//* Purchase */

export type Purchase = {
    invoiceNumber: number;
    date: Date;
    suppliersId: number;
    iva: number;

    detailsPurchases: DetailsTransaction[];
    subtotal: number;
    discount: number;
    total: number;
};

export type PurchasesSlice = {
    purchase: Purchase;
    addPurchase: (purchase: Purchase) => void;
};

//initial data
export const initialPurchase: Purchase = {
    invoiceNumber: 0,
    date: new Date(Date.now()),
    suppliersId: 0,
    iva: 0,
    detailsPurchases: [],
    subtotal: 0,
    discount: 0,
    total: 0,
};
