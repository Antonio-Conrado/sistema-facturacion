// import { Add } from '@mui/icons-material';
// import AutoCompleteSearch from '../Utils/AutoCompleteSearch';
// import { StoredProducts } from '@/types/index';
// import { useAppStore } from '@/store/useAppStore';
// import useTransaction from '@/hooks/useAddTransactionProduct';
// import { SearchFilterValues } from '../../types/index';
// import {
//     Control,
//     Controller,
//     FieldErrors,
//     FieldValues,
//     Path,
//     UseFormSetValue,
// } from 'react-hook-form';
// import { RegisterPurchaseForm, RegisterSaleForm } from '@/types/zustandTypes';

// type FormByTransactionType<T extends 'PURCHASES' | 'SALES'> =
//     T extends 'PURCHASES' ? RegisterPurchaseForm : RegisterSaleForm;

// type TransactionProductSelectorProps<T extends 'PURCHASES' | 'SALES'> = {
//     filters: Partial<SearchFilterValues>;
//     products: StoredProducts;
//     transactionType: T;
//     control: Control<FormByTransactionType<T>>;
//     errors: FieldErrors<FormByTransactionType<T>>;
//     setValue: UseFormSetValue<FormByTransactionType<T>>;
//     allowAddProduct: boolean;
// };
// export default function TransactionProductSelector<
//     T extends 'PURCHASES' | 'SALES',
// >({
//     filters,
//     products,
//     transactionType,
//     control,
//     errors,
//     setValue,
//     allowAddProduct,
// }: TransactionProductSelectorProps<T>) {
//     const addedFromModal = useAppStore((store) => store.addedFromModal);

//     const { handleAddProductById } = useTransaction({
//         transactionType: transactionType,
//         setValue: setValue,
//     });

//     const handleProductChange = (productId: number | null) => {
//         if (!productId) return;
//         handleAddProductById(productId);
//     };
//     return (
//         <>
//             <div className="flex flex-col gap-1 md:flex-row items-start md:items-center md:gap-3 text-gray-800">
//                 <label htmlFor="product" className="w-24  font-semibold">
//                     Seleccionar Producto:
//                 </label>
//                 <div className="flex w-full  items-center gap-2">
//                     <Controller
//                         name={'productId' as Path<FormByTransactionType<T>>}
//                         control={control}
//                         rules={{
//                             validate: (value) =>
//                                 value != null ||
//                                 'Debe seleccionar un producto como mínimo',
//                         }}
//                         render={({ field }) => (
//                             <AutoCompleteSearch
//                                 options={products.map((product) => ({
//                                     value: product.id,
//                                     label:
//                                         product.detailsProducts.products.code +
//                                         ' - ' +
//                                         product.detailsProducts.products.name,
//                                 }))}
//                                 value={filters.productId ?? null}
//                                 onChange={(value) => {
//                                     field.onChange(value);
//                                     handleProductChange(value);
//                                 }}
//                                 title="Producto"
//                                 isSelect={true}
//                             />
//                         )}
//                     />

//                     {errors..message && (
//                         <p className="text-red-500">
//                             {String(errors.productId.message)}
//                         </p>
//                     )}
//                     {allowAddProduct && (
//                         <Add onClick={() => addedFromModal(true, 'products')} />
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

import { Add } from '@mui/icons-material';
import AutoCompleteSearch from '../Utils/AutoCompleteSearch';
import { StoredProducts } from '@/types/index';
import { useAppStore } from '@/store/useAppStore';
import useTransaction from '@/hooks/useAddTransactionProduct';
import { SearchFilterValues } from '../../types/index';
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
    UseFormSetValue,
} from 'react-hook-form';

type TransactionProductSelectorProps<T extends FieldValues> = {
    filters: Partial<SearchFilterValues>;
    products: StoredProducts;
    transactionType: 'PURCHASES' | 'SALES';
    control: Control<T, unknown, T>;
    errors: FieldErrors<T>;
    setValue: UseFormSetValue<T>;
    allowAddProduct: boolean;
};

export default function TransactionProductSelector<T extends FieldValues>({
    filters,
    products,
    transactionType,
    control,
    errors,
    setValue,
    allowAddProduct,
}: TransactionProductSelectorProps<T>) {
    const addedFromModal = useAppStore((store) => store.addedFromModal);

    const { handleAddProductById } = useTransaction<T>({
        transactionType: transactionType,
        setValue: setValue,
    });

    const handleProductChange = (productId: number | null) => {
        if (!productId) return;
        handleAddProductById(productId);
    };
    return (
        <>
            <div className="flex flex-col gap-1 items-start md:gap-3 text-gray-800">
                <label htmlFor="product" className=" font-semibold">
                    Seleccionar Producto
                </label>
                <div className="flex w-full  items-center gap-2">
                    <Controller
                        name={'productId' as Path<T>}
                        control={control}
                        rules={{
                            validate: (value) =>
                                value ||
                                'Debe seleccionar un producto como mínimo',
                        }}
                        render={({ field }) => (
                            <AutoCompleteSearch
                                options={products.map((product) => ({
                                    value: product.id,
                                    label:
                                        product.detailsProducts.products.code +
                                        ' - ' +
                                        product.detailsProducts.products.name,
                                }))}
                                value={filters.productId ?? null}
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleProductChange(value);
                                }}
                                title="Producto"
                                isSelect={true}
                            />
                        )}
                    />

                    {allowAddProduct && (
                        <Add onClick={() => addedFromModal(true, 'products')} />
                    )}
                </div>
                {errors.productId?.message && (
                    <p className="text-red-500">
                        {String(errors.productId.message)}
                    </p>
                )}
            </div>
        </>
    );
}
