import { Add } from '@mui/icons-material';
import AutoCompleteSearch from '../Utils/AutoCompleteSearch';
import BasicModal from '../Utils/BasicModal';
import ProductForm from './ProductForm';
import { StoredProducts } from '@/types/index';
import { useAppStore } from '@/store/useAppStore';
import useTransaction from '@/hooks/useAddTransactionProduct';
import { ModalAction } from '@/data/index';
import { SearchFilterValues } from '../../types/index';
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
} from 'react-hook-form';

type TransactionProductSelectorProps<T extends FieldValues> = {
    filters: Partial<SearchFilterValues>;
    products: StoredProducts;
    transactionType: 'PURCHASES' | 'SALES';
    control: Control<T, unknown, T>;
    errors: FieldErrors<T>;
    allowAddProduct: boolean;
};

export default function TransactionProductSelector<T extends FieldValues>({
    filters,
    products,
    transactionType,
    control,
    errors,
    allowAddProduct,
}: TransactionProductSelectorProps<T>) {
    const addedFromModal = useAppStore((store) => store.addedFromModal);
    const isActiveModal = useAppStore((store) => store.isActiveModal);
    const activeModalKey = useAppStore((store) => store.activeModalKey);

    const { handleAddProductById } = useTransaction({
        transactionType: transactionType,
    });

    const handleProductChange = (productId: number | null) => {
        if (!productId) return;
        handleAddProductById(productId);
    };
    return (
        <>
            <div className="flex flex-col gap-1 md:flex-row items-start md:items-center md:gap-3 text-gray-800">
                <label htmlFor="product" className="w-24  font-semibold">
                    Seleccionar Producto:
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

                    {errors.productId?.message && (
                        <p className="text-red-500">
                            {String(errors.productId.message)}
                        </p>
                    )}
                    {allowAddProduct && (
                        <Add onClick={() => addedFromModal(true, 'products')} />
                    )}
                    {/* show modal to add  a products */}
                    {isActiveModal && activeModalKey === 'products' && (
                        <BasicModal
                            openModal={isActiveModal}
                            onClose={() => addedFromModal(false, 'products')}
                        >
                            <ProductForm
                                onClose={() =>
                                    addedFromModal(false, 'products')
                                }
                                action={ModalAction.Add}
                            />
                        </BasicModal>
                    )}
                </div>
            </div>
        </>
    );
}
