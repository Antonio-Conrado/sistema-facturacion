import ReadOnlyInput from '@/components/Utils/ReadOnlyInput';
import { Purchase } from '@/types/index';

export default function PurchaseTotalDetails({
    purchase,
}: {
    purchase: Purchase;
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReadOnlyInput
                title="Subtotal"
                value={purchase.subtotal}
                dataType="currency"
                name="subtotal"
            />
            <ReadOnlyInput
                title="Descuento"
                value={purchase.discount}
                dataType="currency"
                isWithPercentage={true}
                name="discount"
            />
            <ReadOnlyInput
                title="Iva"
                value={purchase.iva.rate}
                dataType="currency"
                isWithPercentage={true}
                name="iva"
            />
            <ReadOnlyInput
                title="Total"
                value={purchase.total}
                dataType="currency"
                name="total"
            />
        </div>
    );
}
