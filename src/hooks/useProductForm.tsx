import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import useToast from '@/hooks/useNotifications';
import { Categories, ProductForm, StoredProduct } from '@/types/index';
import { ModalAction } from '@/data/index';
import { CreateProductAPI, UpdateProductAPI } from '@/api/product/product';

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
    const categories = queryClient.getQueryData<Categories>(['categories']);

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
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    useEffect(() => {
        reset(initialValues);
    }, [onClose]);

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
