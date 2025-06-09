type valueType = {
    subtotalDetails: number;
    discount: number;
    iva: number;
};
export const calculateTransactionTotal = ({
    subtotalDetails,
    discount,
    iva,
}: valueType): number => {
    const discountTotal = subtotalDetails * (discount / 100);
    const subtotalWithDiscount = subtotalDetails - discountTotal;
    const ivaTotal = (subtotalWithDiscount * iva) / 100;
    return subtotalWithDiscount + ivaTotal;
};
