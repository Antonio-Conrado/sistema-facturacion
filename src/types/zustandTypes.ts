//* general */
export enum ModalKeyList {
    PurchaseInvoice = 'purchaseInvoice',
    SaleInvoice = 'saleInvoice',
}

export type ModalKey =
    | 'suppliers'
    | 'banks'
    | 'products'
    | 'categories'
    | 'purchaseInvoice'
    | 'saleInvoice'
    | 'uploadBankInvoiceReference'
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

//*sales*/

export type RegisterSaleDetailsTransaction = Omit<
    RegisterDetailsTransaction,
    'purchasePrice' | 'salePrice'
> & {
    price: number;
};

export type RegisterSaleForm = {
    usersId: number;
    paymentMethodId: number;
    invoiceNumber: number;
    transactionReference: string;
    bankId: number;
    date: string;
    iva: number;
    detailsSales: RegisterSaleDetailsTransaction[];
    subtotal: number;
    discount: number;
    total: number;
};

export type RegisterSaleAPI = Omit<RegisterSaleForm, 'date'> & {
    date: Date;
};

export type SalesSlice = {
    sale: RegisterSaleForm;
    finalizedSaleId: number;
    addSale: (purchase: RegisterSaleForm) => void;
    removeProductFromSale: (id: number) => void;
    resetSale: () => void;
    saveFinalizedSaleId: (saleId: number) => void;
};
