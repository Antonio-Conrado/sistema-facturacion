import api from '@/config/axios';
import { CategoriesSchema, Category } from '@/types/index';
import { isAxiosError } from 'axios';

export async function getCategoriesAPI() {
    try {
        const { data } = await api(`/categories`);
        const result = CategoriesSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function CreateCategoryAPI(formData: Category) {
    try {
        const { id, status, ...category } = formData;
        const { data } = await api.post<string>('/categories', category);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function UpdateCategoryAPI(formData: Category) {
    try {
        const { status, ...category } = formData;
        const { data } = await api.put<string>(
            `/categories/${formData.id}`,
            category,
        );
        return data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function SuspendCategoryAPI(id: Category['id']) {
    try {
        const { data } = await api.patch<string>(`/categories/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
