import api from '@/config/axios';
import {
    CreateProduct,
    ProductForm,
    StoredProduct,
    StoredProductSchema,
    StoredProductsSchema,
    UpdateProduct,
} from '@/types/index';
import { isAxiosError } from 'axios';

export async function getProductsApi() {
    try {
        const { data } = await api('/products');
        const result = StoredProductsSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
export async function getProductApi(id: StoredProduct['id']) {
    try {
        const { data } = await api(`/products/${id}`);
        const result = StoredProductSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function CreateProductAPI(formData: ProductForm) {
    const product: CreateProduct = {
        detailsProducts: {
            description: formData.description || null,
            products: {
                code: formData.code,
                name: formData.name,
                categoriesId: +formData.categoriesId,
            },
        },
    };
    try {
        const { data } = await api.post<string>('/products', product);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function UpdateProductAPI(formData: ProductForm) {
    const product: UpdateProduct = {
        detailsProducts: {
            id: +formData.detailsProductsId!,
            description: formData.description || null,
            products: {
                id: +formData.productId!,
                code: formData.code,
                name: formData.name,
                categoriesId: +formData.categoriesId,
            },
        },
    };
    try {
        const { data } = await api.put<string>(
            `/products/${product.detailsProducts.products.id}`,
            product,
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function uploadImageProductAPI({
    id,
    file,
}: {
    id?: ProductForm['detailsProductsId'];
    file: File;
}) {
    const formData = new FormData();
    formData.append('image', file); // 'image' should match the field name in the backend

    try {
        const { data } = await api.post<string>(
            `/products/upload-image/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function SuspendProductAPI(id: ProductForm['storedProductId']) {
    try {
        const { data } = await api.patch<string>(`/products/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
