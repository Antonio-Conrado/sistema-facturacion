import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { PaymentMethods, StoredProducts } from '@/types/index';
import Input from '@/components/Utils/Input';
import validateDate, { getLocalDateString } from '@/utils/validateDate';
import SelectIva from '@/components/iva/SelectIva';
import ExtraModals from './ExtraModals';
import validateNumber from '@/utils/validateNumbers';
import useSale from '@/hooks/sale/useSale';
import TransactionProductSelector from '@/components/products/TransactionProductSelector';
import TableSalesDetails from './TableSalesDetails';
import { PaymentMethodsLabel } from '@/data/index';
import { Banks } from '../../../types/index';
import SelectBank from '@/components/catalogs/bank/SelectBank';
import SelectPaymentMethod from '@/components/catalogs/paymentMethods/SelectPaymentMethod';

type FormSalesProps = {
    lastInvoiceNumber: number;
    banks: Banks;
    paymentMethods: PaymentMethods;
    products: StoredProducts;
};

export default function FormSales({
    lastInvoiceNumber,
    banks,
    paymentMethods,
    products,
}: FormSalesProps) {
    const {
        //context and state
        addSale,
        sale,
        filters,
        // react-hook-form
        formMethods,
        //functions
        setFilters,
        handleData,
    } = useSale();

    const {
        handleSubmit,
        formState: { errors },
        register,
        control,
        watch,
        setValue,
    } = formMethods;

    const date = watch('date');

    useEffect(() => {
        setValue('invoiceNumber', lastInvoiceNumber);
    }, [lastInvoiceNumber, setValue]);

    useEffect(() => {
        addSale({
            ...sale,
            date,
        });
    }, [date]);

    const isTransferPaymentMethod = (): boolean => {
        if (!sale.paymentMethodId) return false;

        // Check if the payment method is bank transfer
        return paymentMethods.some(
            (paymentMethod) =>
                paymentMethod.id === sale.paymentMethodId &&
                paymentMethod.name === PaymentMethodsLabel.bankTransfer,
        );
    };

    return (
        <>
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(handleData)} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
                        <Input
                            title="Número de factura"
                            name="invoiceNumber"
                            type="number"
                            msg="El número de factura debe ser válido"
                            isReadOnly={true}
                            errors={errors}
                            register={register}
                            validate={{
                                validate: (value) =>
                                    validateNumber(+value, 'Número de factura'),
                            }}
                        />

                        <Input
                            title="Fecha"
                            name="date"
                            type="date"
                            msg="La fecha debe ser válida"
                            max={getLocalDateString()}
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                            validate={{
                                validate: (value) =>
                                    validateDate(value as string),
                            }}
                        />

                        {/* SUPPLIERS */}
                        <SelectPaymentMethod
                            paymentMethods={paymentMethods}
                            errors={errors}
                            control={control}
                            filters={filters}
                            setFilters={setFilters}
                        />

                        {isTransferPaymentMethod() && (
                            <Input
                                title="Número de referencia de pago"
                                name="transactionReference"
                                type="text"
                                msg="El número de referencia de pago es obligatorio"
                                isReadOnly={false}
                                errors={errors}
                                register={register}
                            />
                        )}

                        {isTransferPaymentMethod() && (
                            <SelectBank
                                banks={banks}
                                errors={errors}
                                control={control}
                                filters={filters}
                                setFilters={setFilters}
                            />
                        )}

                        {/* PRODUCTS */}
                        <TransactionProductSelector
                            filters={filters}
                            products={products}
                            transactionType={'SALES'}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            allowAddProduct={true}
                        />
                    </div>

                    <div className="pt-5">
                        <TableSalesDetails data={sale.detailsSales} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
                        <Input
                            title="Subtotal"
                            name="subtotal"
                            type="number"
                            msg="El subtotal debe ser válido"
                            isReadOnly={true}
                            errors={errors}
                            register={register}
                            validate={{
                                validate: () =>
                                    validateNumber(sale.subtotal, 'subtotal'),
                            }}
                        />

                        <Input
                            title="Descuento"
                            name="discount"
                            type="number"
                            msg="El descuento debe ser válido"
                            max="100"
                            isPercentage={true}
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                            validate={{
                                validate: (value) => {
                                    if (+value < 0 || +value > 50) {
                                        return 'El descuento debe estar en el rango de 0% - 50%';
                                    }
                                    return validateNumber(
                                        sale.discount,
                                        'descuento',
                                    );
                                },
                            }}
                        />

                        <SelectIva
                            filters={filters}
                            setFilters={setFilters}
                            transactionType={'SALES'}
                            control={control}
                            errors={errors}
                        />
                        <Input
                            title="Total"
                            name="total"
                            type="number"
                            msg="El total debe ser válido"
                            isReadOnly={true}
                            errors={errors}
                            register={register}
                            validate={{
                                validate: (value) =>
                                    validateNumber(+value, 'total'),
                            }}
                        />
                    </div>
                    <div className="flex justify-center pt-5">
                        <input
                            type="submit"
                            value={'Registrar venta'}
                            className="btn-confirm disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </form>
            </FormProvider>

            <ExtraModals />
        </>
    );
}
