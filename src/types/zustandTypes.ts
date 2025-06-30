//* general */
export enum ModalKeyList {
    PurchaseInvoice = 'purchaseInvoice',
    SaleInvoice = 'saleInvoice',
}

export type ModalKey =
    | 'suppliers'
    | 'products'
    | 'categories'
    | 'purchaseInvoice'
    | 'saleInvoice'
    | 'default';

export type GeneralSlice = {
    activeModalKey: ModalKey;
    isActiveModal: boolean;
    addedFromModal: (isActiveModal: boolean, activeModalKey: ModalKey) => void;
};

export type RegisterDetailsTransaction = {
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

export type RegisterPurchaseForm = {
    usersId: number;
    suppliersId: number;
    invoiceNumber: number;
    date: string;
    iva: number;
    detailsPurchases: RegisterDetailsTransaction[];
    subtotal: number;
    discount: number;
    total: number;
};

export type RegisterPurchaseAPI = Omit<RegisterPurchaseForm, 'date'> & {
    date: Date;
};

export type PurchasesSlice = {
    purchase: RegisterPurchaseForm;
    finalizedPurchaseId: number;
    addPurchase: (purchase: RegisterPurchaseForm) => void;
    removeProductFromPurchase: (id: number) => void;
    resetPurchase: () => void;
    saveFinalizedPurchaseId: (purchaseId: number) => void;
};
