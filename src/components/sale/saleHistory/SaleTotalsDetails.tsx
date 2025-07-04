import ReadOnlyInput from '@/components/Utils/ReadOnlyInput';
import { Sale } from '@/types/index';

export default function SaleTotalDetails({ sale }: { sale: Sale }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReadOnlyInput
                title="Subtotal"
                value={sale.subtotal}
                dataType="currency"
                name="subtotal"
            />
            <ReadOnlyInput
                title="Descuento"
                value={sale.discount}
                dataType="currency"
                isWithPercentage={true}
                name="discount"
            />
            <ReadOnlyInput
                title="Iva"
                value={sale.iva}
                dataType="currency"
                isWithPercentage={true}
                name="iva"
            />
            <ReadOnlyInput
                title="Total"
                value={sale.total}
                dataType="currency"
                name="total"
            />
        </div>
    );
}
