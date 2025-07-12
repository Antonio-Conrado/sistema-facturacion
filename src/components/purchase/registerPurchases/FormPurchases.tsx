import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { StoredProducts, Suppliers } from '@/types/index';
import Input from '@/components/Utils/Input';
import validateDate from '@/utils/validateDate';
import usePurchase from '@/hooks/purchase/usePurchase';
import TransactionProductSelector from '@/components/products/TransactionProductSelector';
import SelectIva from '@/components/iva/SelectIva';
import TablePurchasesDetails from './TablePurchasesDetails';
import SelectSupplier from '@/components/catalogs/supplier/SelectSupplier';
import ExtraModals from './ExtraModals';
import validateNumber from '@/utils/validateNumbers';

type FormPurchasesProps = {
    suppliers: Suppliers;
    products: StoredProducts;
};

export default function FormPurchases({
    suppliers,
    products,
}: FormPurchasesProps) {
    const {
        //context and state
        addPurchase,
        purchase,
        filters,
        // react-hook-form
        formMethods,
        //functions
        setFilters,
        handleData,
    } = usePurchase();

    const {
        handleSubmit,
        formState: { errors },
        register,
        control,
        watch,
        setValue,
    } = formMethods;

    const date = watch('date');
    const invoiceNumber = watch('invoiceNumber');

    useEffect(() => {
        addPurchase({
            ...purchase,
            date,
            invoiceNumber: Number(invoiceNumber),
        });
    }, [date, invoiceNumber]);

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
                            isReadOnly={false}
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
                            max={new Date().toISOString().split('T')[0]}
                            isReadOnly={false}
                            errors={errors}
                            register={register}
                            validate={{
                                validate: (value) =>
                                    validateDate(value as string),
                            }}
                        />

                        {/* SUPPLIERS */}
                        <SelectSupplier
                            suppliers={suppliers}
                            errors={errors}
                            control={control}
                            filters={filters}
                            setFilters={setFilters}
                        />

                        {/* PRODUCTS */}
                        <TransactionProductSelector
                            filters={filters}
                            products={products}
                            transactionType={'PURCHASES'}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            allowAddProduct={true}
                        />
                    </div>

                    <div className="pt-5">
                        <TablePurchasesDetails
                            data={purchase.detailsPurchases}
                        />
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
                                    validateNumber(
                                        purchase.subtotal,
                                        'subtotal',
                                    ),
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
                                validate: () =>
                                    validateNumber(
                                        purchase.discount,
                                        'descuento',
                                    ),
                            }}
                        />

                        <SelectIva
                            filters={filters}
                            setFilters={setFilters}
                            transactionType={'PURCHASES'}
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
                            value={'Registrar Compra'}
                            className="btn-confirm disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </form>
            </FormProvider>

            <ExtraModals />
        </>
    );
}
