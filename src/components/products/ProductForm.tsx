import Input from '@/components/Utils/Input';
import { ModalAction } from '@/data/index';
import useProductForm from '@/hooks/useProductForm';
import { StoredProduct } from '@/types/index';
import SelectAutocomplete from '../Utils/SelectAutocomplete';
import { Controller } from 'react-hook-form';
import BasicModal from '../Utils/BasicModal';
import CategoryForm from '../catalogs/category/CategoryForm';
import { useAppStore } from '@/store/useAppStore';
import { Add } from '@mui/icons-material';

type ProductFormProps = {
    product?: StoredProduct;
    action: string;
    isReadOnly?: boolean;
    onClose: () => void;
};

export default function ProductForm({
    product,
    action,
    isReadOnly,
    onClose,
}: ProductFormProps) {
    const addedFromModal = useAppStore((store) => store.addedFromModal);
    const isActiveModal = useAppStore((store) => store.isActiveModal);
    const activeModalKey = useAppStore((store) => store.activeModalKey);
    const { categories, register, control, handleSubmit, errors, handleData } =
        useProductForm({ product, action, onClose });

    const title = (actionName: string) => {
        if (actionName === ModalAction.View) return 'Producto';
        if (actionName === ModalAction.Edit) return 'Editar producto';
        if (actionName === ModalAction.Add) return 'Crear producto';
    };
    return (
        <div className="min-w-[220px] md:min-w-[550px] lg:min-w-[850px]">
            <h1 className="text-cyan-800 text-2xl mb-5">{title(action)}</h1>

            <form onSubmit={handleSubmit(handleData)} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                        title="Código"
                        name="code"
                        type="text"
                        msg="El código es obligatorio"
                        isReadOnly={isReadOnly || false}
                        errors={errors}
                        register={register}
                    />

                    <Input
                        title="Nombre"
                        name="name"
                        type="text"
                        msg="El nombre es obligatorio"
                        isReadOnly={isReadOnly || false}
                        errors={errors}
                        register={register}
                    />

                    <div className="grid grid-cols-1">
                        <div className="flex items-center gap-1">
                            <div className="basis-[95%]">
                                {categories && (
                                    <SelectAutocomplete
                                        title="Categoría"
                                        name="categoriesId"
                                        msg="La categoría es obligatoria"
                                        options={categories.map((category) => ({
                                            value: category.id,
                                            label: category.name,
                                        }))}
                                        isReadOnly={isReadOnly || false}
                                        control={control}
                                    />
                                )}
                            </div>
                            <div className="basis-[5%]">
                                <Add
                                    onClick={() =>
                                        addedFromModal(true, 'categories')
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {ModalAction.View === action && (
                        <>
                            <Input
                                title="Stock"
                                name="stock"
                                type="number"
                                msg="El stock es obligatorio"
                                isReadOnly={isReadOnly || false}
                                errors={errors}
                                register={register}
                            />
                            <Input
                                title="Precio de Compra"
                                name="purchasePrice"
                                type="number"
                                msg="El precio de compra es obligatorio"
                                isReadOnly={isReadOnly || false}
                                errors={errors}
                                register={register}
                            />
                            <Input
                                title="Precio de Venta"
                                name="salePrice"
                                type="number"
                                msg="El precio de venta es obligatorio"
                                isReadOnly={isReadOnly || false}
                                errors={errors}
                                register={register}
                            />
                        </>
                    )}
                </div>

                <div className="my-3 flex flex-col gap-1 md:flex-row md:gap-3 text-gray-800">
                    <label htmlFor="description" className="w-20 font-semibold">
                        Descripción:
                    </label>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <textarea
                                {...field}
                                readOnly={isReadOnly}
                                className="border rounded-lg w-full px-2 min-h-fit"
                                value={field.value ?? ''}
                            />
                        )}
                    />
                </div>

                {ModalAction.View !== action && (
                    <div className="flex justify-center pt-5">
                        <input
                            type="submit"
                            value={
                                action === ModalAction.Edit
                                    ? 'Guardar cambios'
                                    : 'Crear categoría'
                            }
                            className="btn-confirm"
                        />
                    </div>
                )}
            </form>

            {/* Show modal to add a category */}
            {isActiveModal && activeModalKey === 'categories' && (
                <BasicModal
                    openModal={isActiveModal}
                    onClose={() => addedFromModal(false, 'categories')}
                >
                    <CategoryForm
                        onClose={() => addedFromModal(false, 'categories')}
                        action={ModalAction.Add}
                    />
                </BasicModal>
            )}
        </div>
    );
}
