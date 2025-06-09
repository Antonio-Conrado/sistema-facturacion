type valueType = {
    purchasePrice?: number;
    salePrice?: number;
    amount: number;
    discount: number;
    type: 'PURCHASE' | 'SALE';
};
export const calculateSubtotalOfDetails = ({
    purchasePrice,
    salePrice,
    amount,
    discount,
    type,
}: valueType): number => {
    const price = type === 'PURCHASE' ? purchasePrice : salePrice;
    if (price && price > 0) {
        const subtotal = price * amount;
        const discountAmount = subtotal * (discount / 100);
        return Number((subtotal - discountAmount).toFixed(2));
    }

    return 0;
};
