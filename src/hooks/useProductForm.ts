import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useToast from '@/hooks/useNotifications';
import { ProductForm, StoredProduct } from '@/types/index';
import { ModalAction } from '@/data/index';
import { CreateProductAPI, UpdateProductAPI } from '@/api/product/product';
import { getCategoriesAPI } from '@/api/catalogs/category';

type useProductFormProps = {
    product: StoredProduct | undefined; // Undefined because it is an option for creation
    action: string;
    onClose: () => void;
};

export default function useProductForm({
    product,
    action,
    onClose,
}: useProductFormProps) {
    const toast = useToast();
    const queryClient = useQueryClient();

    //return only category with status is true
    const { data: categoriesAPI } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoriesAPI,
    });
    let categories;

    if (categoriesAPI) {
        // If the action is 'Edit', show the associated category even if it's deactivated
        categories =
            action === ModalAction.Edit
                ? categoriesAPI.filter(
                      // filter by status true or the reference category of the product
                      (category) =>
                          category.status === true ||
                          category.id ===
                              product?.detailsProducts.products.categoriesId,
                  )
                : categoriesAPI.filter((category) => category.status === true); // filter by categories with status true
    }

    const initialValues: ProductForm = {
        stock: product?.stock || 0,
        purchasePrice: product?.purchasePrice || 0,
        salePrice: product?.salePrice || 0,
        detailsProductsId: product?.detailsProducts?.id || 0,
        description: product?.detailsProducts?.description || null,
        productId: product?.detailsProducts?.products?.id || 0,
        code: product?.detailsProducts?.products?.code || '',
        name: product?.detailsProducts?.products?.name || '',
        categoriesId: product?.detailsProducts?.products?.categoriesId || 0,
    };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn:
            action === ModalAction.Edit ? UpdateProductAPI : CreateProductAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['products'] });
            onClose();
        },
    });

    const handleData = (formData: ProductForm) => {
        mutate(formData);
    };

    return {
        categories,
        register,
        control,
        handleSubmit,
        errors,
        handleData,
    };
}
